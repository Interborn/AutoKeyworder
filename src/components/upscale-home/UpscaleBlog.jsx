import React from 'react'

const UpscaleBlog = () => {
  return (
    <div id="upscaleHome_blogPiece" className="flex flex-col items-center bg-black py-36 gap-20 px-4">
          
        <div id="upscaleHome_blogPiece-top" className="w-full flex justify-center md:gap-32">
        
        <div id="upscaleHome_blogPiece-info" className="w-full flex flex-col items-center max-w-[450px] gap-6">
            
            <h3 className="text-white font-bold text-[38px] leading-none">Read some helpful tips and informative articles in the <span className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900  text-transparent bg-clip-text">Cadogy</span> blog</h3>
            <p className="text-white font-medium text-[18px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque vero in voluptates! Unde nostrum dolorum repellendus temporibus officiis odit dolore consequatur voluptatibus rem tempora sit, explicabo consectetur, adipisci laborum?</p>
        
        </div>
        <div id="upscaleHome_blogPiece-blogList" className="w-full max-w-[600px]">
            
            <div id="slider1" className="w-[90%] h-[90%] bg-stone-900 rounded-3xl">
            
            </div>
            
        </div>
        
        </div>
        <div id="upscaleHome_blogPiece-bottom" className="flex justify-center">
        
        <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900  p-[1px] w-full max-w-[220px] rounded-xl cursor-pointer group">
            <div className="bg-black w-full flex justify-center rounded-xl">
            <p className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900  text-transparent bg-clip-text w-full font-bold text-[20px] mx-8 my-3">View All Articles</p>
            </div>
        </div>
        
        </div>
    
    </div>
  )
}

export default UpscaleBlog
