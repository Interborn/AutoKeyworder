import React from 'react';
import UpscaleHeroItem from './UpscaleHeroItem';

const UpscaleHomeHero = () => {

  return (
    <div id="upscaleHome_hero" className="w-full lg:flex-row flex-col-reverse flex justify-around items-center bg-stone-950 px-4 gap-8 md:py-[5.5em] py-[2em]">
          
      <div id="upscaleHome_hero-left" className="w-full flex justify-center">
        
        <UpscaleHeroItem />
        
      </div>
      <div id="upscaleHome_hero-right" className="w-full">

        <div>
            <h1 className="text-white font-bold text-[56px] max-w-[665px] leading-tight -mb-4">Upscale Images & Videos with AI for <span className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900  text-transparent bg-clip-text">Free</span></h1>
            <h3 className="text-white text-[24px] max-w-[650px] my-8">Leverage AI technology to enhance your image & video quality. Sign up today to upscale your images & videos for free!</h3>
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
