import React, { useRef, useState, useEffect } from 'react';
import uploadIcon from '../../assets/upload-icon.png';

/**
 * Component for updating image input with drag and drop functionality.
 * @param {Function} onUploadClicked - Callback function triggered on upload.
 */
function UpscaleImageInput({ onUploadClicked }) {
    // Refs for DOM elements
    const dropzoneRef = useRef(null);
    const fileInputRef = useRef(null);
    const fileListRef = useRef(null);

    // State variables
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isUpscaled, setIsUpscaled] = useState(false);
    const [isQualitySet, setIsQualitySet] = useState(false);
    const [isUploadClicked, setIsUploadClicked] = useState(false);
    const [isFileAdded, setIsFileAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFolderUploaded, setIsFolderUploaded] = useState(false);

    // Function to process a directory recursively
    const processDirectory = (item, path = '') => {
        return new Promise((resolve, reject) => {
            if (item.isFile) {
                // If the item is a file, get the file and process it
                item.file(file => {
                    resolve({
                        file: file,
                        webkitRelativePath: path + file.name
                    });
                }, reject);
            } else if (item.isDirectory) {
                // If the item is a directory, create a directory reader
                const dirReader = item.createReader();
                dirReader.readEntries(entries => {
                    // Recursively process each entry in the directory
                    const promises = entries.map(entry =>
                        processDirectory(entry, path + item.name + '/')
                    );
                    Promise.all(promises).then(files => {
                        resolve(files.flat());
                    }).catch(reject);
                }, reject);
            }
        });
    };
    
    // Effect hook to handle drag and drop events
    useEffect(() => {
        // Drag and drop event handlers
        const handleDragEnter = (e) => {
            e.preventDefault();
        };

        const handleDragOver = (e) => {
            e.preventDefault();
        };

        // Function to handle drop event
        const handleDrop = async (e) => {
            e.preventDefault();
        
            const items = e.dataTransfer.items;
            const filePromises = [];
        
            for (let i = 0; i < items.length; i++) {
                const entry = items[i].webkitGetAsEntry();
                if (entry) {
                    filePromises.push(processDirectory(entry));
                }
            }
        
            const files = (await Promise.all(filePromises)).flat();
            const filesWithLoadingState = files.map(file => ({
                file: file,
                isLoading: true
            }));
            
            setUploadedFiles(filesWithLoadingState);
            onUploadClicked(filesWithLoadingState, true, true); // Updated
            setIsLoading(true);
            handleSubmit(files); // Pass only the file data to handleSubmit
        };
                
        const handleChange = (e, isFolder = false) => {
            const uploadedFiles = e.target.files;
            const fileObjects = Array.from(uploadedFiles).map(file => ({
                file: file,
                webkitRelativePath: isFolder ? file.webkitRelativePath : file.name,
                isLoading: true
            }));
            
            setUploadedFiles(fileObjects);
            onUploadClicked(fileObjects, true, true); // Updated
            setIsLoading(true);
            handleSubmit(fileObjects); // Pass only the file data to handleSubmit
        };

        // DOM elements
        const dropzone = dropzoneRef.current;

        // Event listeners for drag and drop
        dropzone.addEventListener('dragenter', handleDragEnter);
        dropzone.addEventListener('dragover', handleDragOver);
        dropzone.addEventListener('drop', handleDrop);
        fileInputRef.current.addEventListener('change', handleChange);

        // Cleanup: remove event listeners
        return () => {
            dropzone.removeEventListener('dragenter', handleDragEnter);
            dropzone.removeEventListener('dragover', handleDragOver);
            dropzone.removeEventListener('drop', handleDrop);
            fileInputRef.current.removeEventListener('change', handleChange);
        };
    }, [isUploadClicked, dropzoneRef, fileInputRef]);

    // Function to format bytes into readable size
    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Function to handle form submission
    const handleSubmit = async (files) => {
        // Create FormData from the form
        const formData = new FormData(document.getElementById('folderUpload-formBody'));
      
        // Clear file list display
        fileListRef.current.innerHTML = '';
        let totalSize = 0;
        let isFolder = false;

        // Process each file
        for (const fileData of files) {
            const { file, webkitRelativePath } = fileData; // Destructure fileData
            totalSize += file.size;
            if (webkitRelativePath) {
                isFolder = true;
            }

            // Set file name and size for each file in the file list
            const fileListItem = document.createElement('div');
            fileListItem.textContent = `${file.name} - ${formatBytes(file.size)}`;
            fileListRef.current.appendChild(fileListItem);

            // Append each file to FormData
            formData.append('folderUpload', file, webkitRelativePath);
        }
      
        // Set state based on whether a folder is uploaded
        setIsFolderUploaded(isFolder);
      
        if (isFolder) {
          // Display folder name and total size
          const folderName = files[0].webkitRelativePath.split('/')[0];
          fileListRef.current.textContent = `${files.length} ${files.length <= 1 ? 'file' : 'files'}, ${formatBytes(totalSize)} total size`;
        } else {
          // Display number of files and their total size
          fileListRef.current.textContent = `${files.length} ${files.length <= 1 ? 'file' : 'files'}, ${formatBytes(totalSize)} total size`;
        }
      
        // Set isUpscaled and isQualitySet based on checkbox values
        const upscaleImages = 'true';
        setIsUpscaled(upscaleImages);
        const qualitySet = 'true';
        setIsQualitySet(qualitySet);
      
        // Append qualitySet and upscaleImages to FormData
        formData.append('qualitySet', qualitySet);
        formData.append('upscaleImages', upscaleImages);
      
        try {
          // Send a POST request to upload files
          const response = await fetch('http://localhost:3001/uploads', {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
            console.log('Folder uploaded successfully');
            // Get the response body
            const text = await response.text();
            console.log('Server Response:', text);
      
            // Fetch updated photoList.json
            const photoListResponse = await fetch('http://localhost:3001/photoList');
            const newPhotoList = await photoListResponse.json();
            setUploadedFiles(newPhotoList);
              
            const updatedFiles = newPhotoList.map(file => ({
                ...file,
                isLoading: false  // Set loading to false as files are processed
            }));
            setUploadedFiles(updatedFiles);
            onUploadClicked(updatedFiles, true, qualitySet); // Notify parent about the update

          }
        } catch (error) {
          console.error('There was a problem with the upload:', error);
        }
    };

    return (
        <div className="flex lg:flex-row flex-col w-full transition-container bg-stone-950 items-center justify-center py-28 -mb-12">
            
            <div className="image-input h-full w-full pt-5 pb-7 flex flex-col items-center px-4 gap-14">

                <h1 className={`text-[50px] lg:max-w-[26ch] font-bold text-indigo-200 text-center transition-all duration-700  ${isLoading ? '-mb-[275px]' : 'mab-0'}`}>Upload an image, video, or folder to upscale the quality</h1>

                <form id="folderUpload-formBody" onSubmit={handleSubmit} encType="multipart/form-data" className={`w-full flex justify-center bg-stone-950`}>

                    {/* DROP ZONE */}
                    <div className='w-full h-full flex flex-col items-center gap-2'>
                        <div
                            ref={dropzoneRef}
                            className={`bg-stone-900 px-8 py-20 text-center rounded-lg border-dashed border-2 hover:border-indigo-400 transition duration-300 ease-in-out transform hover:shadow-lg lg:max-w-[600px] lg:max-h-[600px] w-full ${isFileAdded ? 'border-indigo-400' : 'border-indigo-200'}`}
                        >
                            <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center space-y-2">
                                <svg className={`w-16 h-16 text-indigo-200 group-hover:text-indigo-400 transition duration-300 ease-in-out transform ${isFileAdded ? 'text-indigo-400' : 'text-indigo-200'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span className={`text-indigo-200 group-hover:text-indigo-400 transition duration-300 ease-in-out transform ${isFileAdded ? 'text-indigo-400' : 'text-indigo-200'}`}>Drag and drop your files here</span>
                                <span className={`text-indigo-200 group-hover:text-indigo-400 text-sm transition duration-300 ease-in-out transform ${isFileAdded ? 'text-indigo-400' : 'text-indigo-200'}`}>(or click to select)</span>
                            </label>
                            <input id="fileInput" ref={fileInputRef} type="file" className="hidden file-list" name="folderUpload" webkitdirectory="true" directory="true" multiple />
                        </div>
                    

                        {/* OPTION BUTTONS */}
                        <div className={`flex w-full items-center justify-center gap-3 cursor-not-allowed lg:max-w-[600px] lg:max-h-[600px] transition-opacity ease-in duration-700 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                            {/* REFERENCE BOX */}
                            <div className="flex flex-col w-full items-center gap-3 ml-1">
                                <div className="text-center w-full text-indigo-950 ring-indigo-400 bg-indigo-300 bg-opacity-50 ring-2 py-1.5 h-[36px]" ref={fileListRef}></div>                    
                            </div>

                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UpscaleImageInput;