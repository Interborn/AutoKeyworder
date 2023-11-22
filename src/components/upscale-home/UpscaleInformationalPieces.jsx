import React from 'react'

const UpscaleInformationalPieces = () => {
  return (
    <div id="upscaleHome_pieces" className="w-full flex flex-col items-center bg-stone-950 py-14 px-4">
          
        <div id="upscaleHome_pieces-header" className="flex flex-col items-center py-20">
        
        <h3 className="font-bold text-[44px] text-white">Enterprise Solutions at Scale</h3>
        <p className="font-bold text-[20px] text-white">Explore our suite of extended capabilities that ease up your regular workflows</p>
        
        </div>
        <div id="upscaleHome_pieces-top" className="w-full flex md:flex-row flex-col justify-center items-center md:gap-32">
        
        <div className="flex justify-center">
            <img src="https://cdn.pixelbin.io/v2/dummy-cloudname/original/erasebg_assets/home_page/illustrations-01.png" className="md:max-h-none max-h-[400px]" alt="" />
        </div>
        
        <div className="flex flex-col justify-center">
            <h4 className="font-bold text-[44px] text-white">Bulk Transformation</h4>
            <p className="max-w-[52ch] text-[20px] text-white">No more switching back and forth to transform images. Experience bulk background removal on a single platform by uploading multiple images at once.</p>
        </div>
        
        </div>
        <div id="upscaleHome_pieces-bottom" className="w-full flex md:flex-row-reverse flex-col  justify-center items-center  md:gap-32">
        
        <div className="flex justify-center">
            <img src="https://cdn.pixelbin.io/v2/dummy-cloudname/original/erasebg_assets/home_page/illustrations-02.png" alt="" />
        </div>
        
        <div className="flex flex-col justify-center">
            <h4 className="font-bold text-[44px] text-white">API Integration</h4>
            <p className="max-w-[52ch] text-[20px] text-white">Speed up your workflows and enhance productivity by seamlessly integrating our APIs into your existing organization.</p>
        </div>
        
        </div>

    </div>
  )
}

export default UpscaleInformationalPieces
