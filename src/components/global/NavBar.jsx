import React, { useState} from 'react'

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggles the mobile menu open state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='w-full'>

      {/* REGULAR MENU */}

      <div id="upscaleGlobal_nav" className="md:flex hidden sticky z-[999] top-0 h-[70px] w-full justify-between items-center bg-stone-950 px-6 border-b-[1px] border-gray-500">
          
          <a href="/">
            <img src="https://cadogy.com/assets/cadogy-shield-cf2a447d.svg" height="60" width="60" alt="" />
          </a>

          <div className="flex gap-12 items-center">
            <div className="flex gap-16 font-bold text-gray-300">
              <a href="/upscale">
                <p>Upscale Images & Videos</p>
              </a>
              <a href="/">
                <p>Features</p>
              </a>
              <a href="/">
                <p>FAQs</p>
              </a>
              <a href="/">
                <p>Blog</p>
              </a>
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

      {/* MOBILE MENU */}

      <div id="upscaleGlobal_nav" className="md:hidden flex sticky z-[999] top-0 right-0 h-[70px] w-full justify-between items-center bg-stone-950 px-6 border-b-[1px] border-gray-500">
          
        <a href="/">
          <img src="https://cadogy.com/assets/cadogy-shield-cf2a447d.svg" height="60" width="60" alt="" />
        </a>
        
        <div id='upscaleGlobal_nav-mobile'>
          <button onClick={toggleMobileMenu} class="relative group">
              <div class="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all duration-200 shadow-md">
                <div class="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                  <div className={`bg-white h-[2px] w-7 transform transition-all duration-300 ${isMobileMenuOpen ? 'translate-x-10' : 'origin-left'}`}></div>
                  <div className={`bg-white h-[2px] w-7 rounded delay-75 transform transition-all duration-300 ${isMobileMenuOpen ? 'translate-x-10' : 'origin-left'}`}></div>
                  <div className={`bg-white h-[2px] w-7 transform transition-all duration-300 ${isMobileMenuOpen ? 'translate-x-10' : 'origin-left'}`}></div>

                  <div className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 flex ${isMobileMenuOpen ? 'w-12 translate-x-0' : 'w-0 -translate-x-10'}`}>
                    <div className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 delay-300 ${isMobileMenuOpen ? 'rotate-45' : 'rotate-0'}`}></div>
                    <div className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 delay-300 ${isMobileMenuOpen ? '-rotate-45' : '-rotate-0'}`}></div>
                  </div>
                </div>
              </div>
            </button>
          </div>
      
      </div>

      <div id='upscaleGlobal_nav-mobileMenuContainer' className={`absolute z-[800] top-0 right-0 w-full h-[105vh] rounded-3xl transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-y-[100vh]'}`}>

        <div className="flex flex-col gap-12 w-full h-full justify-center items-center min-h-[400px] bg-stone-950 max-w-full text-[2em]">

          <div className="flex flex-col gap-8 text-center w-full font-bold text-stone-300">

            <a href="/">
              <p className='hover:text-indigo-400'>Features</p>
            </a>
            <a href="/">
              <p className='hover:text-indigo-400'>FAQs</p>
            </a>
            <a href="/">
              <p className='hover:text-indigo-400'>Blog</p>
            </a>
            <a href="/">
              <p className='hover:text-indigo-400'>Guides</p>
            </a>
            <a href="/" className='w-full flex justify-center'>
              <p className='py-3 px-8 bg-indigo-400 max-w-[20ch] rounded-lg hover:bg-indigo-500'>Upscale New Image</p>
            </a>
            <div className='flex w-full justify-center gap-12 font-medium italic text-[0.85em] -mt-6'>
              <a href="/">
                <p className='hover:underline hover:text-indigo-400'>Login</p>
              </a>
              <a href="/">
                <p className='hover:underline hover:text-indigo-400'>Sign-Up</p>
              </a>
            </div>

          </div>

        </div>
        
      </div>

      <div className="gap-12 items-center hidden">

        <div className="flex gap-16 font-bold text-gray-300">

          <a href="/upscale">
            <p>Upscale Images & Videos</p>
          </a>
          <a href="/">
            <p>Features</p>
          </a>
          <a href="/">
            <p>FAQs</p>
          </a>
          <a href="/">
            <p>Blog</p>
          </a>

        </div>
        
        <div className="flex gap-2 text-[16px]">

          <span className="px-5 py-2 rounded-lg hover:bg-stone-900">
            <p className="text-gray-500">Login</p>
          </span>
          <span className="bg-white px-5 py-2 rounded-lg bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 text-white font-bold">
            <p className="text-gray-300">Signup</p>
          </span>

        </div>

      </div>

    </div>
  )
}

export default NavBar
