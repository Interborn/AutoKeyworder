import "./index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare as uncheckedSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare as checkedSquare } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import React, { useState } from 'react';

library.add(uncheckedSquare, checkedSquare);

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const serverOrigin = `${window.location.protocol}//${window.location.hostname}:3001`;
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    try {
      const response = await fetch('http://localhost:3001/uploads', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        if (response.ok) {
          console.log('Folder uploaded successfully');
          const text = await response.text(); // get the response body
          console.log("Server Response:", text);
          // Fetch updated photoList.json
          const photoListResponse = await fetch('http://localhost:3001/photoList');
          const newPhotoList = await photoListResponse.json();
          setUploadedFiles(newPhotoList);
        }
      }
    } catch (error) {
      console.error('There was a problem with the upload:', error);
    }
  };


  return (
    <main className="flex justify-center items-center gap-4 flex-col min-h-screen w-full">

      <div className="absolute top-5">
        <p>To-Do List:</p>
          <div className="flex gap-[5vw]">
            <ul className="text-[13px]">
              <li className="flex items-center gap-3"><FontAwesomeIcon icon={uncheckedSquare} style={{ color: '#843eb7'}} /> Create UI for Live Editing</li>
              <li className="flex items-center gap-3"><FontAwesomeIcon icon={uncheckedSquare} style={{ color: '#843eb7'}} /> Batch Upload to Adobe Stock</li>
            </ul>
          </div>
      </div>


      <div className="w-[70%]">
        <h1 className="text-[32px] font-bold">Adobe Stock Photo Manager</h1>
        <h2 className="text-[20px] italic">AI Upscale, AI Keyword & AI Title Generation, and Batch Upload to Adobe Stock</h2>
      </div>
      <ol className="w-[70%] flex justify-between">
        <li className="flex gap-2 items-center"><span className="bg-[#843eb7] px-2.5 py-0.5 rounded-full text-white font-bold text-[16px]">1</span>Upload Photos/Folder</li>
        <li className="flex gap-2 items-center"><span className="bg-[#843eb7] px-2.5 py-0.5 rounded-full text-white font-bold text-[16px]">2</span>Input Adobe Stock Account</li>
        <li className="flex gap-2 items-center"><span className="bg-[#843eb7] px-2.5 py-0.5 rounded-full text-white font-bold text-[16px]">3</span>Click Upload to Submit!</li>
      </ol>
      
      <div id="folderUpload">
        

        <form id="folderUpload-formBody" onSubmit={handleSubmit} encType="multipart/form-data">
          
          
          <label id="folderUpload-inputText" htmlFor="folderUpload">Select a Folder:</label>
          <input id="folderUpload-inputButton" type="file" name="folderUpload" webkitdirectory="true" directory="true" multiple />
          
          
          <div id="folderUpload-optionBar" className="flex flex-wrap justify-between">
            <span className="flex justify-center items-center gap-3"><input type="checkbox" id="folderUpload-upscaleImages" name="upscaleImages" value="true"></input>
            <p>AI Upscale Images</p></span>
            <span className="flex justify-center items-center gap-3"><input type="checkbox" id="folderUpload-genKeyword" name="genKeyword" value="true"></input>
            <p>AI Generate Keywords</p></span>
            <span className="flex justify-center items-center gap-3"><input type="checkbox" id="folderUpload-genQuality" name="genQuality" value="true"></input>
            <p>AI Generate Quality Score</p></span>
            <span className="flex justify-center items-center gap-3"><input type="checkbox" id="folderUpload-genTitle" name="genTitle" value="true"></input>
            <p>AI Generate Title</p></span>
            <span className="flex justify-center items-center gap-3"><input type="checkbox" id="folderUpload-useFilenames" name="useFilenames" value="true"></input>
            <p>Use Filenames in Title Generation</p></span>
          </div>
          
          
          <input id="folderUpload-submitButton" type="submit" value="Upload" />
          
        </form>

      </div>

      <div className="w-[100%] flex justify-center;">
        <ul id="liveLookList">
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <img src={`${serverOrigin}/upscaled/${file.sanitizedTitle}.jpg`} alt={file.generatedFilename} width="100" height="100" />
              <span>Title: {file.generatedFilename}</span>
              <span>Size: {file.filesize}</span>
              <span>Quality Score: {file.qualityScore}</span>
              <span>Keywords: {file.keywords}</span>
            </li>
          ))}
        </ul>
      </div>

    </main>
  );
}

export default App;
