import React from 'react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const UpscaleImageSlide = ({category, imageOne, imageTwo}) => {
  
  return (
    <div>
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={imageOne} alt={`${category}-NonUpscaledPhoto`} className='lg:min-w-[1200px] w-full' />}
        itemTwo={<ReactCompareSliderImage src={imageTwo} alt={`${category}-UpscaledPhoto`} className='lg:min-w-[1200px] w-full' />}
        style={{
          height: '500px',
          backgroundPosition: 'center center',
        }}
        className='lg:rounded-xl'
        boundsPadding={80}
      />
    </div>
  )
}

export default UpscaleImageSlide
