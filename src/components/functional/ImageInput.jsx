import React, { useRef, useState, useEffect } from 'react';
import uploadIcon from '../../../assets/upload-icon.png';

function ImageInput({ onUploadClicked }) {
    const dropzoneRef = useRef(null);
    const fileInputRef = useRef(null);
    const fileListRef = useRef(null);
    
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isUpscaled, setIsUpscaled] = useState(false);
    const [isTitleSet, setIsTitleSet] = useState(false);
    const [isKeywordsSet, setIsKeywordsSet] = useState(false);
    const [isQualitySet, setIsQualitySet] = useState(false);
    const [isUploadClicked, setIsUploadClicked] = useState(false);
    const [isFileAdded, setIsFileAdded] = useState(false);
    const [isCsvHovered, setIsCsvHovered] = useState(false);
    const [isUpdateHovered, setIsUpdateHovered] = useState(false);
    
    const [editedFiles, setEditedFiles] = useState([]);
    const [isFolderUploaded, setIsFolderUploaded] = useState(false);

    
    
    const serverOrigin = `${window.location.protocol}//${window.location.hostname}:3001`;
    
    useEffect(() => {
        const initialEditedFiles = uploadedFiles.map(file => ({
        ...file,
        editedTitle: file.generatedFilename,
        editedKeywords: file.keywords
        }));
        setEditedFiles(initialEditedFiles);
    }, [uploadedFiles]);

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            onUploadClicked(uploadedFiles);
        }
    }, [uploadedFiles, onUploadClicked]);  
    
    const generateCsvFile = async () => {
        try {
            const response = await fetch(`${serverOrigin}/generate-csv`);
            if (response.ok) {
                console.log('CSV file generated successfully.');
            } else {
                console.error('Failed to generate CSV file.');
            }
        } catch (error) {
            console.error('Error generating CSV file:', error);
        }
    };
    
    const downloadRecords = async () => {
        try {
            const response = await fetch(`${serverOrigin}/download-records`);
            if (response.ok) {
                // Retrieve the binary blob from the response
                const blob = await response.blob();
                // Create a link element and trigger download
                const downloadUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = 'records.zip';
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(downloadUrl); // Clean up the URL object
                console.log('Records downloaded successfully.');
            } else {
                console.error('Failed to download records.');
            }
        } catch (error) {
            console.error('Error downloading records:', error);
        }
    };
    
    useEffect(() => {
        const handleDragEnter = (e) => {
            e.preventDefault();
            if (!isUploadClicked) {
                dropzoneRef.current.classList.add('border-green-600');
            }
        };
    
        const handleDragOver = (e) => {
            e.preventDefault();
            if (!isUploadClicked) {
                dropzoneRef.current.classList.add('border-green-600');
            }
        };
    
        const handleDragLeave = () => {
            if (!isUploadClicked) {
                dropzoneRef.current.classList.remove('border-green-600');
            }
        };
    
        const handleDrop = (e) => {
            e.preventDefault();
            if (!isUploadClicked) {
                dropzoneRef.current.classList.remove('border-green-600');
            }
            handleFiles(e.dataTransfer.files);
        };
    
        const handleChange = (e) => {
            handleFiles(e.target.files);
        };
    
    
        const dropzone = dropzoneRef.current;
    
    
        dropzone.addEventListener('dragenter', handleDragEnter);
        dropzone.addEventListener('dragover', handleDragOver);
        dropzone.addEventListener('dragleave', handleDragLeave);
        dropzone.addEventListener('drop', handleDrop);
        fileInputRef.current.addEventListener('change', handleChange);
    
        return () => {
            dropzone.removeEventListener('dragenter', handleDragEnter);
            dropzone.removeEventListener('dragover', handleDragOver);
            dropzone.removeEventListener('dragleave', handleDragLeave);
            dropzone.removeEventListener('drop', handleDrop);
            fileInputRef.current.removeEventListener('change', handleChange);
        };
    }, [isUploadClicked, dropzoneRef, fileInputRef]);
    
    const handleFiles = (files) => {
        fileListRef.current.innerHTML = '';
        let totalSize = 0;
        let isFolder = false;
    
        for (const file of files) {
            totalSize += file.size;
            if (file.webkitRelativePath) { // this property is usually present for files in a folder
                isFolder = true;
            }
        }
    
        setIsFolderUploaded(isFolder);
    
        if (isFolder) {
            const folderName = files[0].webkitRelativePath.split('/')[0]; // Gets the folder name
            fileListRef.current.textContent = `${folderName} (${formatBytes(totalSize)})`;
        } else {
            for (const file of files) {
                const listItem = document.createElement('div');
                const maxNameLength = 33;
                let truncatedName = file.name.length > maxNameLength ? file.name.substring(0, maxNameLength) + '...' : file.name;
                listItem.textContent = `${truncatedName} (${formatBytes(file.size)})`;
                fileListRef.current.appendChild(listItem);
            }
        }
    
        setIsFileAdded(files.length > 0);
    };
    
    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        // Set isUpscaled based on the checkbox value
        const upscaleImages = formData.get('upscaleImages') === 'true';
        setIsUpscaled(upscaleImages);
        const titleSet = formData.get('genTitle') === 'true';
        setIsTitleSet(titleSet);
        const keywordSet = formData.get('genKeyword') === 'true';
        setIsKeywordsSet(keywordSet);
        const qualitySet = formData.get('genQuality') === 'true';
        setIsQualitySet(qualitySet);
    
        try {
            const response = await fetch('http://localhost:3001/uploads', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                console.log('Folder uploaded successfully');
                const text = await response.text(); // get the response body
                console.log("Server Response:", text);
                // Fetch updated photoList.json
                const photoListResponse = await fetch('http://localhost:3001/photoList');
                const newPhotoList = await photoListResponse.json();
                setUploadedFiles(newPhotoList);
                onUploadClicked(newPhotoList, upscaleImages, titleSet, keywordSet, qualitySet);
            }
        } catch (error) {
            console.error('There was a problem with the upload:', error);
        }
    };
    
    const handleJsonEditorSubmit = async (event) => {
        event.preventDefault();
        const updatedData = editedFiles.map(file => ({
        originalFilename: file.originalFilename,
        generatedFilename: file.editedTitle,
        keywords: file.editedKeywords
        }));
        try {
        const response = await fetch('http://localhost:3001/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
        });
        if (response.ok) {
        console.log('JSON data updated successfully');
        const text = await response.text();
        console.log('Server Response:', text);
        } else {
        const text = await response.text();
        console.error('Error updating JSON data:', text);
        }
        } catch (error) {
        console.error('There was a problem with updating the JSON data:', error);
        }
    };

  return (
    <div className={`flex lg:flex-row flex-col w-full transition-container $justify-start`}>
              
        <div className={`image-input h-full w-full lg:max-w-[600px] lg:max-h-[600px] pt-5 pb-7 px-10 bg-white rounded-lg shadow-lg`}>
            {/* HEADER STYLING */}
            <div class="relative py-4 -my-4 z-0">
                <div class="absolute inset-0 flex items-center z-0">
                    <div class="w-full border-b border-gray-300 -mt-2"></div>
                </div>
                <div class="relative flex justify-left items-center">
                    <span class="bg-white pr-4 text-left text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">File Drop and Upload</span>
                </div>
            </div>

            <form id="folderUpload-formBody" onSubmit={handleSubmit} encType="multipart/form-data z-10">                        

                {/* AI OPTIONS */}
                <div id="folderUpload-optionBar" className="grid md:grid-cols-2 justify-between z-10">
                    <span className="flex justify-stretch items-center gap-3"><input type="checkbox" id="folderUpload-upscaleImages" name="upscaleImages" value="true"></input>
                    <p>AI Upscale Images</p></span>
                    <span className="flex justify-stretch items-center gap-3"><input type="checkbox" id="folderUpload-genTitle" name="genTitle" value="true"></input>
                    <p>AI Generate Title</p></span>
                    <span className="flex justify-stretch items-center gap-3"><input type="checkbox" id="folderUpload-genKeyword" name="genKeyword" value="true"></input>
                    <p>AI Generate Keywords</p></span>
                    <span className="flex justify-stretch items-center gap-3"><input type="checkbox" id="folderUpload-useFilenames" name="useFilenames" value="true"></input>
                    <p>Use Filenames in Title</p></span>
                    <span className="flex justify-stretch items-center gap-3"><input type="checkbox" id="folderUpload-genQuality" name="genQuality" value="true"></input>
                    <p>AI Generate Quality Score</p></span>
                </div>

                {/* DROP ZONE */}
                <div
                    ref={dropzoneRef}
                    className={`bg-gray-100 px-8 py-4 text-center rounded-lg border-dashed border-2 hover:border-green-600 transition duration-300 ease-in-out transform hover:shadow-lg group mb-1 ${isFileAdded ? 'border-green-600' : 'border-gray-400'}`}
                >
                    <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center space-y-2">
                        <svg className="w-16 h-16 text-gray-400 group-hover:text-green-600 transition duration-300 ease-in-out transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <span className="text-gray-600">Drag and drop your files here</span>
                        <span className="text-gray-500 text-sm">(or click to select)</span>
                    </label>
                    <input id="fileInput" ref={fileInputRef} type="file" className="hidden" name="folderUpload" webkitdirectory="true" directory="true" multiple />
                </div>
                
                {/* REFERENCE BOX */}
                <div className="flex flex-col w-full items-center gap-3">
                    <div className="text-center w-full text-slate-400 ring-slate-200 ring-2 py-1.5 h-[36px]" ref={fileListRef}></div>                    
                </div>

                {/* OPTION BUTTONS */}
                <div className="flex flex-col w-full justify-around gap-3">
                    
                    <div
                        id="folderUpload-submitButton" 
                        type="submit" 
                        value="Upload" 
                        className="relative mx-auto h-10 w-full flex justify-center items-center group transition-opacity duration-300 ease-in-out"
                        disabled={!isFileAdded}
                        onClick={() => setIsUploadClicked(true)}
                    >
                        <input 
                            id="folderUpload-submitButton" 
                            type="submit" 
                            value="" 
                            className={`bg-green-300 py-2 h-10 w-full items-center rounded-sm shadow-lg hover:shadow-xl cursor-pointer absolute overflow-hidden transform transition duration-300 ease-in-out`}
                            disabled={!isFileAdded}
                            onClick={() => setIsUploadClicked(true)}
                        />
                        <p className="text-center pl-3 pr-1 mr-2 text-green-700 font-bold z-10 pointer-events-none transition-transform duration-200 ease-in-out group-hover:-translate-x-4 h-full flex items-center ml-9 bg-green-300">Upload</p>
                        <img src={uploadIcon} alt="Upload Icon" className="cursor-pointer h-full max-h-[26px] transition duration-300 ease-in-out -translate-x-10 opacity-20 group-hover:opacity-80 group-hover:-translate-x-3 w-[28px]" />
                    </div>

                    {/* UPDATE DATA & GENERATE CSV BUTTONS */}
                    <div className='flex gap-3'>

                        {/* UPDATE DATA BUTTON */}
                        <div
                            id="jsonEditor-submitButton"
                            className={`relative mx-auto h-10 w-full flex justify-center items-center group transition-all duration-300 ease-in-out ${isUpdateHovered ? 'w-3/5' : ''} ${isCsvHovered ? 'w-2/5' : ''}`}
                            onClick={handleJsonEditorSubmit}
                            onMouseEnter={() => setIsUpdateHovered(true)}
                            onMouseLeave={() => setIsUpdateHovered(false)}
                        >
                            <div className="bg-green-300 py-2 h-10 w-full items-center rounded-sm shadow-lg hover:shadow-xl cursor-pointer absolute overflow-hidden transform transition duration-300 ease-in-out">
                            </div>
                            <p className="text-center pl-3 pr-1 mr-2 text-green-700 font-bold z-10 pointer-events-none transition-transform duration-200 ease-in-out group-hover:-translate-x-4 h-full flex items-center ml-9 bg-green-300">Update Data</p>
                            <img src={uploadIcon} alt="Upload Icon" className="cursor-pointer h-full max-h-[26px] transition duration-300 ease-in-out -translate-x-10 opacity-20 group-hover:opacity-80 group-hover:-translate-x-3 w-[28px]" />

                        </div>

                        {/* GENERATE CSV BUTTON */}
                        <div
                            id="generateAdobeDataSubmit"
                            className={`relative mx-auto h-10 w-full flex justify-center items-center group transition-all duration-300 ease-in-out ${isUpdateHovered ? 'w-2/5' : ''} ${isCsvHovered ? 'w-3/5' : ''}`}
                            onClick={generateCsvFile}
                            onMouseEnter={() => setIsCsvHovered(true)}
                            onMouseLeave={() => setIsCsvHovered(false)}
                        >
                            <div className="bg-green-300 py-2 h-10 w-full items-center rounded-sm shadow-lg hover:shadow-xl cursor-pointer absolute overflow-hidden transform transition duration-300 ease-in-out">
                            </div>
                            <p className="text-center pl-3 pr-1 mr-2 text-green-700 font-bold z-10 pointer-events-none transition-transform duration-200 ease-in-out group-hover:-translate-x-4 h-full flex items-center ml-9 bg-green-300">Generate CSV</p>
                            <img src={uploadIcon} alt="Upload Icon" className="cursor-pointer h-full max-h-[26px] transition duration-300 ease-in-out -translate-x-10 opacity-20 group-hover:opacity-80 group-hover:-translate-x-3 w-[28px]" />
                        </div>
                    </div>

                    {/* DOWNLOAD FILES BUTTON */}
                    <div id="recordDownloadSubmit" className="relative mx-auto h-10 w-full flex justify-center items-center group transition-opacity duration-300 ease-in-out" onClick={downloadRecords}>
                        <div className="bg-green-300 py-2 h-10 w-full items-center rounded-sm shadow-lg hover:shadow-xl cursor-pointer absolute overflow-hidden transform transition duration-300 ease-in-out">
                        </div>
                        <p className="text-center pl-3 pr-1 mr-2 text-green-700 font-bold z-10 pointer-events-none transition-transform duration-200 ease-in-out group-hover:-translate-x-4 h-full flex items-center ml-9 bg-green-300">Download File & Images</p>
                        <img src={uploadIcon} alt="Upload Icon" className="cursor-pointer h-full max-h-[26px] transition duration-300 ease-in-out -translate-x-10 opacity-20 group-hover:opacity-80 group-hover:-translate-x-3 w-[28px]" />
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
}

export default ImageInput;