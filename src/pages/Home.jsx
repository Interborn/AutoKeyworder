import React from 'react'
import NavBar from '../components/global/NavBar'
import UpscaleHomeHero from '../components/upscale-home/UpscaleHomeHero'
import UpscaleImageSlider from '../components/upscale-home/UpscaleImageSlider'
// import UpscaleVideoSlider from '../components/upscale-home/UpscaleVideoSlider'
import UpscaleInformationalPieces from '../components/upscale-home/UpscaleInformationalPieces'
import UpscaleBlog from '../components/upscale-home/UpscaleBlog'
import OtherProducts from '../components/global/OtherProducts'
import UpscaleFAQ from '../components/upscale-home/UpscaleFAQ'
import Guides from '../components/global/Guides'
import Footer from '../components/global/Footer'
import UpscaleLetter from '../components/upscale-home/UpscaleLetter'

const Home = () => {
  return (
    <div className='w-full h-full'>
      <NavBar />
        <UpscaleHomeHero />
        <UpscaleImageSlider />
        <UpscaleInformationalPieces />
        {/* <UpscaleVideoSlider /> */}
        <UpscaleBlog />
        <UpscaleFAQ />
        <Guides />
        <OtherProducts />
        <UpscaleLetter />
      <Footer />
    </div>
  )
}

export default Home