import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-full border-t-[1px] border-gray-500'>
      
        <div id="upscaleHome_footer" className="w-full flex flex-col items-center bg-stone-950 gap-10 pt-10 border-b-[1px] border-gray-500">

        <div id="upscaleHome_footer-header" className="flex flex-col items-center w-full gap-6rounded-t-3xl">

        <div className="flex items-center justify-center">
            <img src="https://cadogy.com/assets/cadogy-shield-cf2a447d.svg" height="50" width="50" alt="" className="translate-y-1" />
            <h3 className="font-bold w-full text-[48px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 text-transparent bg-clip-text ml-2">Cadogy Upscaler</h3>
        </div>

        </div>
        <div id="upscaleHome_footer-links" className="flex flex-col items-center w-full p-2 max-w-[1250px]">

        <ul className="flex justify-evenly w-full text-stone-200 font-bold text-[18px] ">
            <li className="hover:text-indigo-300 cursor-pointer">Terms</li>
            <li className="hover:text-indigo-300 cursor-pointer">Privacy</li>
            <li className="hover:text-indigo-300 cursor-pointer">Blog</li>
            <li className="hover:text-indigo-300 cursor-pointer">Guides</li>
            <li className="hover:text-indigo-300 cursor-pointer">Articles</li>
            <li className="hover:text-indigo-300 cursor-pointer">About Us</li>
        </ul>

        </div>
        <div id="upscaleHome_footer-bottom" className="flex flex-col items-center w-full gap-6 rounded-t-3xl">

        <div className="flex gap-10 pb-10 w-full justify-around max-w-[1250px]">
            <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 p-[1px] w-full rounded-xl cursor-not-allowed text-stone-200 hover:opacity-50 max-w-[350px]">
            <div className="bg-stone-950 w-full flex flex-col justify-center items-center text-center py-4 px-6 rounded-xl gap-8">
                <h4 className="text-[22px] font-bold">AI Image & Video Upscaling</h4>
            </div>
            </div>
            <div className="cursor-pointer text-stone-200 max-w-[350px] bg-gradient-to-r amber-400">
            <div className="w-full flex flex-col justify-center items-center text-center py-4 px-6 rounded-xl gap-8 bg-amber-200 hover:bg-amber-300 text-amber-500 hover:text-amber-700">
                <h4 className="text-[22px] font-bold ">AI Background Removal</h4>
            </div>
            </div>
            <div className="cursor-pointer text-stone-200 max-w-[350px]">
            <div className="w-full flex flex-col justify-center items-center text-center py-4 px-6 rounded-xl gap-8 bg-red-200 hover:bg-red-300 text-red-400 hover:text-red-600">
                <h4 className="text-[22px] font-bold">Adobe Stock Metadata</h4>
            </div>
            </div>
            
        </div>
        
        </div>

        </div>
    </div>
  )
}

export default Footer
