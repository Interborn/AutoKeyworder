import React, { useEffect, useState, useRef } from 'react';
import ImageInput from './ImageInput';
import ListLookView from './ListLookView';

function UploadPopup({ title }) {
    
    const [isUploadClicked, setIsUploadClicked] = useState(false);
    const [editedFiles, setEditedFiles] = useState([]);
    const [isUpscaled, setIsUpscaled] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isTitleSet, setIsTitleSet] = useState(false);
    const [isKeywordsSet, setIsKeywordsSet] = useState(false);
    const [isQualitySet, setIsQualitySet] = useState(false);
    
    const onUploadClicked = (files, upscaled, title, keywords, quality) => {
        setUploadedFiles(files);
        setIsUpscaled(upscaled);
        setIsUploadClicked(true);
        setIsTitleSet(title);
        setIsKeywordsSet(keywords);
        setIsQualitySet(quality);
    };

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            onUploadClicked(uploadedFiles, isUpscaled, isTitleSet, isKeywordsSet, isQualitySet);
        }
    }, [uploadedFiles, isUpscaled, isTitleSet, isKeywordsSet, isQualitySet]);
     
    useEffect(() => {
      const initialEditedFiles = uploadedFiles.map(file => ({
        ...file,
        editedTitle: file.generatedFilename,
        editedKeywords: file.keywords
      }));
      setEditedFiles(initialEditedFiles);
    }, [uploadedFiles]);

    return (
        <main className="absolute top-0 z-[999] bg-green-100 flex justify-around items-center md:flex-row flex-col min-h-screen w-screen lg:px-20 sm:px-10 px-4">

            <div className={`flex flex-col w-full lg:w-2/5 gap-8 items-start`}>

                {/* POPUP HEADER */}
                <div className={`max-w-[600px]`}>
                    <h3 className="text-[50px] mr-4 font-bold text-green-600 drop-shadow-lg text-center">Upload an image or folder for upscaling</h3>
                </div>

                {/* IMAGE INPUT */}
                <ImageInput onUploadClicked={onUploadClicked} />

            </div>
            
            <div className='flex w-full lg:w-3/5'>

            <div className={`flex w-full transition-container justify-end visible ${isUploadClicked ? 'visible' : 'hidden'}`}>
                <div id="liveLookListFrame" className='w-full overflow-x-hidden bg-white h-[90vh] rounded-xl shadow-lg'>
                    <div className='flex items-center w-full py-8 px-4 '>
                        {/* IMAGE FORM */}
                        <ListLookView 
                            uploadedFiles={uploadedFiles} 
                            isUpscaled={isUpscaled} 
                            isTitleSet={isTitleSet} 
                            isKeywordsSet={isKeywordsSet} 
                            isQualitySet={isQualitySet} 
                        />
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
};

export default UploadPopup;