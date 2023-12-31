import "./index.css";
import React, { useState, useEffect, useRef } from 'react';

import uploadIcon from './assets/upload-icon.png';

import UploadPopup from "./components/uploadPopup.jsx";


// function App() {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [isUpscaled, setIsUpscaled] = useState(false);
//   const [isTitleSet, setIsTitleSet] = useState(false);
//   const [editedFiles, setEditedFiles] = useState([]);

//   const serverOrigin = `${window.location.protocol}//${window.location.hostname}:3001`;

//   useEffect(() => {
//     const initialEditedFiles = uploadedFiles.map(file => ({
//         ...file,
//         editedTitle: file.generatedFilename,
//         editedKeywords: file.keywords
//     }));
//     setEditedFiles(initialEditedFiles);
//   }, [uploadedFiles]);

//   const handleTitleChange = (index, event) => {
//     const updatedFiles = [...editedFiles];
//     updatedFiles[index].editedTitle = event.target.value;
//     setEditedFiles(updatedFiles);
//   };

//   const generateCsvFile = async () => {
//     try {
//       const response = await fetch(`${serverOrigin}/generate-csv`);
//       if (response.ok) {
//         console.log('CSV file generated successfully.');
//       } else {
//         console.error('Failed to generate CSV file.');
//       }
//     } catch (error) {
//       console.error('Error generating CSV file:', error);
//     }
//   };

//   const downloadRecords = async () => {
//     try {
//       const response = await fetch(`${serverOrigin}/download-records`);
//       if (response.ok) {
//         // Retrieve the binary blob from the response
//         const blob = await response.blob();
//         // Create a link element and trigger download
//         const downloadUrl = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = downloadUrl;
//         a.download = 'records.zip';
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         URL.revokeObjectURL(downloadUrl); // Clean up the URL object
//         console.log('Records downloaded successfully.');
//       } else {
//         console.error('Failed to download records.');
//       }
//     } catch (error) {
//       console.error('Error downloading records:', error);
//     }
//   };
  
//   const handleKeywordsChange = (index, event) => {
//       const updatedFiles = [...editedFiles];
//       updatedFiles[index].editedKeywords = event.target.value;
//       setEditedFiles(updatedFiles);
//   };
  
//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     const formData = new FormData(event.target);
//     // Set isUpscaled based on the checkbox value
//     const upscaleImages = formData.get('upscaleImages') === 'true';
//     setIsUpscaled(upscaleImages);
//     const titleSet = formData.get('genTitle') === 'true';
//     setIsTitleSet(titleSet);
    
//     try {
//       const response = await fetch('http://localhost:3001/uploads', {
//         method: 'POST',
//         body: formData,
//      });
  
//       if (response.ok) {
//         if (response.ok) {
//           console.log('Folder uploaded successfully');
//           const text = await response.text(); // get the response body
//           console.log("Server Response:", text);
//           // Fetch updated photoList.json
//           const photoListResponse = await fetch('http://localhost:3001/photoList');
//           const newPhotoList = await photoListResponse.json();
//           setUploadedFiles(newPhotoList);
//         }
//       }
//     } catch (error) {
//       console.error('There was a problem with the upload:', error);
//     }
//   };

//   const handleJsonEditorSubmit = async (event) => {
//     event.preventDefault();
//     const updatedData = editedFiles.map(file => ({
//       originalFilename: file.originalFilename,
//       generatedFilename: file.editedTitle,
//       keywords: file.editedKeywords
//     }));
//     try {
//       const response = await fetch('http://localhost:3001/update', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updatedData)
//       });
//       if (response.ok) {
//         console.log('JSON data updated successfully');
//         const text = await response.text();
//         console.log('Server Response:', text);
//       } else {
//         const text = await response.text();
//         console.error('Error updating JSON data:', text);
//       }
//     } catch (error) {
//       console.error('There was a problem with updating the JSON data:', error);
//     }
//   };

//   return (
//     <main className="flex justify-center items-center gap-4 flex-col min-h-screen w-full">

//       <div className="w-[70%]">
//         <h1 className="text-[32px] font-bold">Adobe Stock Photo Manager</h1>
//         <h2 className="text-[20px] italic">AI Upscale, AI Keyword & AI Title Generation, and Batch Upload to Adobe Stock</h2>
//       </div>
//       <ol className="w-[70%] flex justify-between">
//         <li className="flex gap-2 items-center"><span className="bg-[#843eb7] px-2.5 py-0.5 rounded-full text-white font-bold text-[16px]">1</span>Upload Photos/Folder</li>
//         <li className="flex gap-2 items-center"><span className="bg-[#843eb7] px-2.5 py-0.5 rounded-full text-white font-bold text-[16px]">2</span>Input Adobe Stock Account</li>
//         <li className="flex gap-2 items-center"><span className="bg-[#843eb7] px-2.5 py-0.5 rounded-full text-white font-bold text-[16px]">3</span>Click Upload to Submit!</li>
//       </ol>
      
//       <div id="folderUpload">
        

//         <form id="folderUpload-formBody" onSubmit={handleSubmit} encType="multipart/form-data">
          
//           <label id="folderUpload-inputText" htmlFor="folderUpload">Select a Folder:</label>
//           <input id="folderUpload-inputButton" type="file" name="folderUpload" webkitdirectory="true" directory="true" multiple />
                    
//           <div id="folderUpload-optionBar" className="flex flex-wrap justify-between">
//             <span className="flex justify-center items-center gap-3"><input type="checkbox" id="folderUpload-upscaleImages" name="upscaleImages" value="true"></input>
//             <p>AI Upscale Images</p></span>
//             <span className="flex justify-center items-center gap-3"><input type="checkbox" id="folderUpload-genKeyword" name="genKeyword" value="true"></input>
//             <p>AI Generate Keywords</p></span>
//             <span className="flex justify-center items-center gap-3"><input type="checkbox" id="folderUpload-genQuality" name="genQuality" value="true"></input>
//             <p>AI Generate Quality Score</p></span>
//             <span className="flex justify-center items-center gap-3"><input type="checkbox" id="folderUpload-genTitle" name="genTitle" value="true"></input>
//             <p>AI Generate Title</p></span>
//             <span className="flex justify-center items-center gap-3"><input type="checkbox" id="folderUpload-useFilenames" name="useFilenames" value="true"></input>
//             <p>Use Filenames in Title Generation</p></span>
//           </div>
                    
//           <input id="folderUpload-submitButton" type="submit" value="Upload" />
          
//         </form>

//       </div>

//       <form id="jsonEditor-formBody" onSubmit={handleJsonEditorSubmit} encType="multipart/form-data" className="flex flex-col items-center gap-4">
//         <div className="w-[100%] flex justify-center">
//           <ul id="liveLookList" className="flex flex-wrap w-full h-full gap-5">
//             {uploadedFiles.map((file, index) => {
//               // Debug: Print out the image URL
//               const imageUrl =
//               `${serverOrigin}${isUpscaled ? '/upscaled' : '/uploads'}/${isUpscaled && isTitleSet ? `${file.sanitizedTitle}.jpg` : `${file.originalFilename}`}`;
//               console.log(`Image URL: ${imageUrl}`);

//               return (
//                 <li key={index} className="flex gap-5 mx-5">
//                   <div className="w-full max-w-[360px]">
//                     <img src={imageUrl} alt={file.generatedFilename} className="object-cover w-full h-full max-w-[300px] max-h-[200px] -mb-[1.38em] rounded-md" />

//                     <div className="flex justify-between w-full">
//                       <span className="bg-white pl-1 pr-2 rounded-tr-md">
//                         <span className="font-bold">Size:</span> {isUpscaled ? file.upscaledFilesize : file.filesize}
//                       </span>
//                       <span className="bg-white pl-2 pr-1 rounded-tl-md flex gap-2">
//                         <span className="font-bold">Quality Score:</span>
//                         <span className="">{parseFloat(file.qualityScore).toFixed(4)}</span>
//                       </span>
//                     </div>
//                   </div>

                
//                   <div className="flex flex-col justify-evenly">
//                       <span className="flex gap-16">
//                         <span className="font-bold">Title:</span>
//                         <input id="titleEditor" value={editedFiles[index]?.editedTitle || ''} onChange={(event) => handleTitleChange(index, event)} />
//                       </span>
//                       <span className="pb-10 flex gap-6">
//                         <span className="font-bold">Keywords:</span>
//                         <input className="keywordEditor" value={editedFiles[index]?.editedKeywords || ''} onChange={(event) => handleKeywordsChange(index, event)} />
//                       </span>
//                   </div>

//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//         <div className="flex gap-5">
//           <input id="jsonEditor-submitButton" className="w-[200px] bg-purple-700 text-white rounded-sm my-4 py-1" type="submit" value="Update" />
//           <input id="generateAdobeDataSubmit" className="w-[200px] bg-purple-700 text-white rounded-sm my-4 py-1" type="button" value="Generate CSV" onClick={generateCsvFile} />
//           <input id="recordDownloadSubmit" className="w-[200px] bg-purple-700 text-white rounded-sm my-4 py-1" type="button" value="Download" onClick={downloadRecords} />
//         </div>
//       </form>

//     </main>
//   );
// }

// function App() {
//   // State to control the visibility of the UploadPopup
//   const [showUploadPopup, setShowUploadPopup] = useState(false);

//   // Function to open the UploadPopup
//   const openUploadPopup = () => {
//     setShowUploadPopup(true);
//   };

//   // Function to close the UploadPopup
//   const closeUploadPopup = () => {
//     setShowUploadPopup(false);
//   };

//   return (
//     <main className="flex justify-center items-center flex-col min-h-screen w-full">
//       {/* HEADER CONTENT */}
//       <div className="flex justify-stretch items-center w-full h-[10.5vh] min-h-[75px] px-8 bg-green-50">
//         <h1 className="font-bold text-white text-[40px] drop-shadow-lg">Adobe Stock Photo Manager</h1>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="flex flex-col justify-evenly w-full h-[66vh] min-h-[510px] px-8 bg-green-300">
//         <h1 className="font-bold text-white text-[40px] drop-shadow-lg">Adobe Stock Photo Manager</h1>

       

//       </div>

//       {/* OPTIONS */}
//       <div className="flex justify-around items-center w-full h-[21vh] min-h-[165px] px-8 bg-green-300 mt-[2.5vh]">

//         {/* AI UPSCALE OPTION */}
      
//         <div className="relative mx-auto h-16 w-64 flex justify-center items-center group transition-opacity duration-300 ease-in-out" onClick={openUploadPopup} >

//           <div className="ring-2 ring-green-600 h-16 w-64 items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 transition duration-300 ease-in-out">
//           </div>
//           <p className="text-center pl-3 pr-1 mr-2 text-green-700 font-bold z-10 pointer-events-none transition-transform duration-200 ease-in-out group-hover:-translate-x-4 h-full flex items-center ml-9 bg-green-300">AI Upscale Images</p>
//           <img src={uploadIcon} alt="Upload Icon" className="cursor-pointer h-full max-h-[26px] transition duration-300 ease-in-out -translate-x-10 opacity-20 group-hover:opacity-80 group-hover:-translate-x-3 w-[28px]" />

//         </div>

//         {/* AI GENERATE KEYWORDS OPTION */}

//         <div className="relative mx-auto h-16 w-64 flex justify-center items-center group transition-opacity duration-300 ease-in-out" onClick={openUploadPopup} >

//           <div className="ring-2 ring-green-600 h-16 w-64 items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 transition duration-300 ease-in-out">
//           </div>
//           <p className="text-center pl-3 pr-1 mr-2 text-green-700 font-bold z-10 pointer-events-none transition-transform duration-200 ease-in-out group-hover:-translate-x-4 h-full flex items-center ml-9 bg-green-300">AI Generate Keywords</p>
//           <img src={uploadIcon} alt="Upload Icon" className="cursor-pointer h-full max-h-[26px] transition duration-300 ease-in-out -translate-x-10 opacity-20 group-hover:opacity-80 group-hover:-translate-x-3 w-[28px]" />

//         </div>

//         {/* AI GENERATE TITLE OPTION */}
      
//         <div className="relative mx-auto h-16 w-64 flex justify-center items-center group transition-opacity duration-300 ease-in-out" onClick={openUploadPopup} >

//           <div className="ring-2 ring-green-600 h-16 w-64 items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 transition duration-300 ease-in-out">
//           </div>
//           <p className="text-center pl-3 pr-1 mr-2 text-green-700 font-bold z-10 pointer-events-none transition-transform duration-200 ease-in-out group-hover:-translate-x-4 h-full flex items-center ml-9 bg-green-300">AI Generate Title</p>
//           <img src={uploadIcon} alt="Upload Icon" className="cursor-pointer h-full max-h-[26px] transition duration-300 ease-in-out -translate-x-10 opacity-20 group-hover:opacity-80 group-hover:-translate-x-3 w-[28px]" />

//         </div>

//         {/* AI UPSCALE OPTION */}

//         <div className="relative mx-auto h-16 w-64 flex justify-center items-center group transition-opacity duration-300 ease-in-out" onClick={openUploadPopup} >

//           <div className="ring-2 ring-green-600 h-16 w-64 items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 transition duration-300 ease-in-out">
//           </div>
//           <p className="text-center pl-3 pr-1 mr-2 text-green-700 font-bold z-10 pointer-events-none transition-transform duration-200 ease-in-out group-hover:-translate-x-4 h-full flex items-center ml-9 bg-green-300">Custom AI Usage</p>
//           <img src={uploadIcon} alt="Upload Icon" className="cursor-pointer h-full max-h-[26px] transition duration-300 ease-in-out -translate-x-10 opacity-20 group-hover:opacity-80 group-hover:-translate-x-3 w-[28px]" />

//         </div>

//         {/* UploadPopup - Conditionally rendered */}
//         {showUploadPopup && <UploadPopup onClose={closeUploadPopup} />}

//       </div>

//     </main>
//   );
// }

// export default App;