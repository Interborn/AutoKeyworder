import React, { useState } from 'react'
import UpscaleInput from './UpscaleInput'

const UpscaleHomeHero = () => {

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

  return (
    <div id="upscaleHome_hero" className="w-full md:flex-row flex-col-reverse flex justify-around items-center bg-stone-950 px-4 gap-8">
          
      <div id="upscaleHome_hero-left" className="w-full flex justify-center">
        
          <video autoPlay loop className="w-full max-w-[600px]">
              <source src="https://cdn.pixelbin.io/v2/dummy-cloudname/original/erasebg_assets/upload_page/EraseBG_Hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
          </video>
        
      </div>
      <div id="upscaleHome_hero-right" className="w-full my-16">

        <div>
            <h1 className="text-white font-bold text-[56px] max-w-[650px] leading-tight">Upscale Image & Video Quality For <span className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900  text-transparent bg-clip-text">Free</span></h1>
            <h3 className="text-white text-[28px] max-w-[650px] my-4">Experience accurate background removal. Sign up today to avail your first 3 credits for free!</h3>
        </div>
        
        <div className={`flex lg:flex-row flex-col w-full transition-container $justify-start lg:max-w-[650px]`}>
            
            <div className={`image-input h-full w-full lg:max-h-[600px] rounded-lg shadow-lg`}>
    
                {/* DROP ZONE */}
                <div
                    className={`bg-stone-900 px-8 py-16 text-center rounded-lg border-dashed border-2 hover:border-indigo-400 transition duration-300 ease-in-out transform hover:shadow-lg group border-indigo-200`}
                >
                  <a href='/upscale' className="">
                    <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center space-y-2">
                        <svg className="w-16 h-16 text-indigo-200 group-hover:text-indigo-400 transition duration-300 ease-in-out transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <span className="text-indigo-200 ">Drag and drop your files here</span>
                        <span className="text-indigo-200 text-sm">(or click to select)</span>
                    </label>
                  </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UpscaleHomeHero
