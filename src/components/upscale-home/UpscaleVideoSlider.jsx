import React, { useRef, useState, useEffect } from 'react'

const UpscaleVideoSlider = () => {

  const [selected, setSelected] = useState("Marketing");
  const [videoItems, setVideoItems] = useState([
    ...["Marketing", "Photography", "E-Commerce", "Developers", "Enterprise", "Individuals", "Professional", "Real Estate", "Media", "Car Dealership"],
    ...["Marketing", "Photography", "E-Commerce", "Developers", "Enterprise", "Individuals", "Professional", "Real Estate", "Media", "Car Dealership"]
  ]);
  
  // Ref to track the slider container
  const sliderVideoRef = useRef(null);
  
  const handleSelect = (item) => {
    setSelected(item);
  };
  
  useEffect(() => {
    if (selected !== null && sliderVideoRef.current) {
      const slider = sliderVideoRef.current;
      const selectedElement = slider.querySelector(`[data-item="${selected}"]`);
  
      if (selectedElement) {
        // Calculate the position to scroll to
        const scrollPosition = selectedElement.offsetLeft - slider.offsetLeft;
  
        slider.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [selected]);

  return (
    <div id="upscaleHome_videoSlider" className="flex flex-col items-center bg-stone-950 md:pb-28 px-4">
            
        <div id="upscaleHome_videoSlider-header" className="flex flex-col w-full items-center">
            
            <h3 className="font-bold text-[44px] text-white">Not Just Any Other Background Removal Tool</h3>
            <p className="font-bold text-[20px] text-white">Get precise and quick image transformations regardless of what industry you belong to!</p>
            
        </div>
        
        <div id="upscaleHome_videoSlider-selectSlider" className="flex overflow-x-auto gap-28 max-w-[90vw] lg:max-w-[70vw] hide-scrollbar text-white my-16 border-b-[1px] border-gray-500" ref={sliderVideoRef}>
        {videoItems.map((item, index) => (
            <p
            key={index}
            data-item={item}
            onClick={() => handleSelect(item)}
            className={`cursor-pointer py-2 my-0 min-w-[140px] ${selected === item ? 'border-b-8 border-purple-500 font-bold' : ''}`}
            >
            {item}
            </p>
        ))}
        </div>
        
        <div id="upscaleHome_videoSlider-imageSlider">
            
            <img src="https://i.gyazo.com/d543dca3226cd06b09de7e9c6b93b7e8.png" alt="" />
            
        </div>

    </div>
  )
}

export default UpscaleVideoSlider
