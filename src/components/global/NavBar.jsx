import React from 'react'

const NavBar = () => {
  return (
    <div id="upscaleGlobal_nav" className="sticky z-[999] top-0 h-[70px] w-full flex justify-between items-center bg-stone-950 px-6 border-b-[1px] border-gray-500">
          
        <img src="https://cadogy.com/assets/cadogy-shield-cf2a447d.svg" height="60" width="60" alt="" />
        
        <div className="flex gap-12 items-center">
        <div className="flex gap-16 font-bold text-gray-300">
            <span>
            <p>Upscale Images & Videos</p>
            </span>
            <span>
            <p>Features</p>
            </span>
            <span>
            <p>FAQs</p>
            </span>
            <span>
            <p>Blog</p>
            </span>

        </div>
        <div className="flex gap-2 text-[16px]">
            <span className="px-5 py-2 rounded-lg hover:bg-stone-900">
            <p className="text-gray-500">Login</p>
            </span>
            <span className="bg-white px-5 py-2 rounded-lg bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900  text-white font-bold">
            <p className="text-gray-300">Signup</p>
            </span>
        </div>
        </div>
    
    </div>
  )
}

export default NavBar
