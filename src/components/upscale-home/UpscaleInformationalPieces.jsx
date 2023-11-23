import React from 'react'

const UpscaleInformationalPieces = () => {
  return (
    <div id="upscaleHome_pieces" className="w-full flex flex-col items-center bg-stone-950 py-14 px-4">
          
        <div id="upscaleHome_pieces-header" className="flex flex-col items-center py-20">
        
        <h3 className="font-bold text-[44px] text-white">Photographic Features</h3>
        <p className="font-bold text-[20px] text-white max-w-[60ch] text-center">Explore the features of our AI enhancement software that significantly increase your productivity!</p>
        
        </div>
        <div id="upscaleHome_pieces-top" className="w-full flex md:flex-row flex-col justify-center items-center md:gap-32">
        
        <div className="flex justify-center">
            <img src="https://cdn.pixelbin.io/v2/dummy-cloudname/original/erasebg_assets/home_page/illustrations-01.png" className="md:max-h-none max-h-[400px]" alt="" />
        </div>
        
        <div className="flex flex-col justify-center">
            <h4 className="font-bold text-[44px] text-white">Bulk Upscaling</h4>
            <p className="max-w-[52ch] text-[20px] text-white">No more switching back and forth to transform images. Experience bulk image upscaling and video upscaling by uploading up to 95 files at a time!</p>
        </div>
        
        </div>
        <div id="upscaleHome_pieces-bottom" className="w-full flex md:flex-row-reverse flex-col  justify-center items-center  md:gap-32">
        
        <div className="flex justify-center">
            <img src="https://cdn.pixelbin.io/v2/dummy-cloudname/original/erasebg_assets/home_page/illustrations-02.png" alt="" />
        </div>
        
        <div className="flex flex-col justify-center">
            <h4 className="font-bold text-[44px] text-white">Side-by-Side Comparison</h4>
            <p className="max-w-[52ch] text-[20px] text-white">Compare your images to each other with our side-by-side view! Use a magnified tooltip to explore true quality enhancement!</p>
        </div>
        
        </div>

    </div>
  )
}

export default UpscaleInformationalPieces
