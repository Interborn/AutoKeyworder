import React, { useRef, useState, useEffect } from 'react';

function UpscaleInput({ onUploadClicked }) {
    const dropzoneRef = useRef(null);
    const fileInputRef = useRef(null);
    const fileListRef = useRef(null);
    
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isUploadClicked, setIsUploadClicked] = useState(false);
    const [isFileAdded, setIsFileAdded] = useState(false);
    
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
        if (fileListRef.current) {
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
        }
    };
    
    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    

  return (
    <div className={`flex lg:flex-row flex-col w-full transition-container $justify-start lg:max-w-[650px]`}>
            
        <div className={`image-input h-full w-full lg:max-h-[600px] rounded-lg shadow-lg`}>

            {/* DROP ZONE */}
            <div
                ref={dropzoneRef}
                className={`bg-stone-900 px-8 py-16 text-center rounded-lg border-dashed border-2 hover:border-indigo-400 transition duration-300 ease-in-out transform hover:shadow-lg group ${isFileAdded ? 'border-indigo-400' : 'border-indigo-200'}`}
            >
                <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center space-y-2">
                    <svg className="w-16 h-16 text-indigo-200 group-hover:text-indigo-400 transition duration-300 ease-in-out transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span className="text-indigo-200 ">Drag and drop your files here</span>
                    <span className="text-indigo-200 text-sm">(or click to select)</span>
                </label>
                <input id="fileInput" ref={fileInputRef} type="file" className="hidden file-list" name="folderUpload" webkitdirectory="true" directory="true" multiple />
            </div>
        </div>
    </div>
  );
}

export default UpscaleInput;