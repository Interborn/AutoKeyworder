import "./index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare as uncheckedSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare as checkedSquare } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(uncheckedSquare, checkedSquare);

function App() {
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    try {
      const response = await fetch('http://localhost:3001/uploads', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Folder uploaded successfully');
        // Additional logic here
      } else {
        console.log('Failed to upload folder');
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
        
      </div>

    </main>
  );
}

export default App;
