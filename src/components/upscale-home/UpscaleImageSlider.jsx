import React, { useRef, useState, useEffect } from 'react'
import UpscaleImageSlide from './UpscaleImageSlide';
import imageOne from '../../assets/nonUpscaledImage.jpg'
import imageTwo from '../../assets/upscaledImage.jpg'
import imageThree from '../../assets/discord.png'
import imageFour from '../../assets/discordhovered.png'

const UpscaleImageSlider = () => {

  
  const originalPhotoItems = [
    ...[{category: "Marketing", imageOne: imageOne, imageTwo: imageTwo },
        {category: "Photography", imageOne: imageThree, imageTwo: imageFour },
        {category: "Individuals", imageOne: imageOne, imageTwo: imageTwo },
        {category: "E-Commerce", imageOne: imageOne, imageTwo: imageTwo },
        {category: "Developers", imageOne: imageOne, imageTwo: imageTwo },
        {category: "Enterprise", imageOne: imageOne, imageTwo: imageTwo },
        {category: "Real Estate", imageOne: imageOne, imageTwo: imageTwo },
        {category: "Car Dealership", imageOne: imageOne, imageTwo: imageTwo },]
  ];

  const photoItems = [...originalPhotoItems, ...originalPhotoItems];
  
  const [selected, setSelected] = useState({
    category: "Marketing",
    imageOne: imageOne,
    imageTwo: imageTwo
  });
  
  const sliderPhotoRef = useRef(null);
  
  const handleSelect = (item) => {
    setSelected(item);
  };
  
  useEffect(() => {
    if (selected && sliderPhotoRef.current) {
      const slider = sliderPhotoRef.current;
      const selectedElement = slider.querySelector(`[data-item="${selected.category}"]`);
  
      if (selectedElement) {
        const scrollPosition = selectedElement.offsetLeft - slider.offsetLeft;
        slider.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [selected]);

  return (
    <div id="upscaleHome_photoSlider" className="flex flex-col items-center bg-stone-950 md:pb-20 md:py-0 py-20">
          
      <div id="upscaleHome_photoSlider-header" className="flex flex-col w-full items-center px-4">
        <h3 className="font-bold text-[44px] text-white">The Ultimate Image Upscaler Tool</h3>
        <p className="font-bold text-[20px] text-white">Effortlessly enhance your images with speed and precision!</p>
      </div>
      
      <div id="upscaleHome_photoSlider-selectSlider" className="flex overflow-x-auto gap-28 max-w-[90vw] lg:max-w-[70vw] hide-scrollbar text-white my-16 border-b-[1px] border-gray-500 px-4" ref={sliderPhotoRef}>
      {photoItems.map((item, index) => (
        <p
          key={index}
          data-item={item.category}
          onClick={() => handleSelect(item)}
          className={`cursor-pointer px-3 py-2 my-0 min-w-[140px] ${selected.category === item.category ? 'border-b-8 border-purple-500 font-bold' : ''}`}
        >
          {item.category}
        </p>
      ))}
      </div>
      
      <div id="upscaleHome_photoSlider-imageSlider">
        <UpscaleImageSlide
          category={selected.category}
          imageOne={selected.imageOne} 
          imageTwo={selected.imageTwo} 
        />
      </div>

    </div>
  )
}

export default UpscaleImageSlider
