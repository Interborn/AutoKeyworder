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
          <div id="folderUpload-bgRemovalOption">
            <input type="checkbox" id="folderUpload-bgRemovalBtn" name="bgRemovalBtn" value="true"></input>
            <p>AI Background Removal</p>
          </div>
          <input id="folderUpload-submitButton" type="submit" value="Upload" />
          <div className="flex gap-[5vw]">
            <ul className="text-[13px]">
              <li className="flex items-center gap-3 line-through italic"><FontAwesomeIcon icon={checkedSquare} style={{ color: '#843eb7'}} /> Upload Images to Server</li>
              <li className="flex items-center gap-3 line-through italic"><FontAwesomeIcon icon={checkedSquare} style={{ color: '#843eb7'}} /> Upscale Images (RealESRGAN)</li>
              <li className="flex items-center gap-3 line-through italic"><FontAwesomeIcon icon={checkedSquare} style={{ color: '#843eb7'}} /> Generate 7-10 Keywords</li>
              <li className="flex items-center gap-3 line-through italic"><FontAwesomeIcon icon={checkedSquare} style={{ color: '#843eb7'}} /> Add Metadata to JSON</li>
            </ul>
            <ul className="text-[13px]">
              <li className="flex items-center gap-3"><FontAwesomeIcon icon={uncheckedSquare} style={{ color: '#843eb7'}} /> Generate 2x More Keywords</li>
              <li className="flex items-center gap-3"><FontAwesomeIcon icon={uncheckedSquare} style={{ color: '#843eb7'}} /> Generate Marketable Title</li>
              <li className="flex items-center gap-3"><FontAwesomeIcon icon={uncheckedSquare} style={{ color: '#843eb7'}} /> Rename Images/Update JSON</li>
              <li className="flex items-center gap-3"><FontAwesomeIcon icon={uncheckedSquare} style={{ color: '#843eb7'}} /> Batch Upload to Adobe Stock</li>
            </ul>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;
