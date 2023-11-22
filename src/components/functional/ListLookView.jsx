import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function ListLookView({ uploadedFiles, isUpscaled, isTitleSet, isKeywordsSet, isQualitySet }) {
    const [editedFiles, setEditedFiles] = useState([]);
    const serverOrigin = `${window.location.protocol}//${window.location.hostname}:3001`;

    useEffect(() => {
      const initialEditedFiles = uploadedFiles.map(file => ({
          ...file,
          editedTitle: file.generatedFilename,
          editedKeywords: file.keywords
      }));
      setEditedFiles(initialEditedFiles);
    }, [uploadedFiles, isTitleSet, isKeywordsSet, isQualitySet]);
    

    const handleTitleChange = (index, event) => {
        const updatedFiles = [...editedFiles];
        updatedFiles[index].editedTitle = event.target.value;
        setEditedFiles(updatedFiles);
    };   
    
    const handleKeywordsChange = (index, event) => {
        const updatedFiles = [...editedFiles];
        updatedFiles[index].editedKeywords = event.target.value;
        setEditedFiles(updatedFiles);
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
    <form id="jsonEditor-formBody" onSubmit={handleJsonEditorSubmit} encType="multipart/form-data" className="w-full">
      <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
      <Masonry gutter="16px">
        {uploadedFiles.map((file, index) => {
          let filename;
          let folder;
          isTitleSet = false;
          isUpscaled = false;
          isKeywordsSet = false;

          if (isTitleSet) {
            if (isUpscaled) { 
              folder = 'upscaled';
              filename = `${file.sanitizedTitle}.jpg`;
            }
            else {
              folder = 'uploads';
              filename = file.originalFilename;
            }
          } else {
            if (isUpscaled) {
              folder = 'upscaled';
              filename = file.originalFilename;
            } else {
              folder = 'uploads';
              filename = file.originalFilename;
            }
          }
          
          const imageUrl = `${serverOrigin}/${folder}/${filename}`;
          return (
            <div key={index} className="relative">
              <img src={imageUrl} alt={filename} className="object-cover w-full rounded-md" />
              <div className="absolute bottom-0 left-0 right-0 bg-green-100 bg-opacity-80 p-2">
                
                {/* Title and keywords editor */}
                <div className='flex items-center text-[14px] text-slate-800'>
                  <span className="font-bold mr-1">Title:</span>
                  <input className="w-full bg-transparent px-1 text-slate-700" value={editedFiles[index]?.editedTitle || ''} onChange={(event) => handleTitleChange(index, event)} />
                </div>

                <div className='flex items-center text-[14px] text-slate-800'>
                  <span className="font-bold mr-1">Keywords:</span>
                  <input className="w-full bg-transparent px-1 text-slate-700" value={editedFiles[index]?.editedKeywords || ''} onChange={(event) => handleKeywordsChange(index, event)} />
                </div>

                <div className='flex items-center text-[14px] text-slate-800'>
                  <span className="font-bold mr-1">Quality:</span>
                  <input className="w-full bg-transparent px-1 text-slate-700" value={file.qualityScore} readOnly />
                </div>

                <div className='flex items-center text-[14px] text-slate-800'>
                  <span className="font-bold mr-1">Size:</span>
                  <input className="w-full bg-transparent px-1 text-slate-700" value={file.filesize} />
                </div>

              </div>
            </div>
          );
        })}
      </Masonry>
      </ResponsiveMasonry>
    </form>
  );
}

export default ListLookView;