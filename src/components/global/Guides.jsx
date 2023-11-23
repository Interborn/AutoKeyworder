import React, { useState } from 'react'

const Guides = () => {

  const [selectedCategory, setSelectedCategory] = useState("how-to");
  const howToGuides = [
    {
        title: 'Remove BG From Text Long Title Text',
        image: 'https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg',
        link: '',
        views: '406',
        author: 'Dylan S.',
    },
    {
        title: 'Remove BG From Gif From Text Long Title Text',
        image: 'https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg',
        link: '',
        views: '110',
        author: 'Charles K.',
    },
    {
        title: 'Remove BG From PPT From Text Long Title Text',
        image: 'https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg',
        link: '',
        views: '314',
        author: 'Dylan S. & Charles K.',
    },
  ];
  const upscaleInfoGuides = [
    {
        title: 'Remove BG From Text Long Title Text',
        image: 'https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg',
        link: '',
        views: '1',
        author: 'Dylan S.',
    },
    {
        title: 'Remove BG From Gif From Text Long Title Text',
        image: 'https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg',
        link: '',
        views: '1',
        author: 'Charles K.',
    },
    {
        title: 'Remove BG From PPT From Text Long Title Text',
        image: 'https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg',
        link: '',
        views: '1',
        author: 'Dylan S. & Charles K.',
    },
  ];
  const otherGuides = [
    {
        title: 'Remove BG From Text Long Title Text',
        image: 'https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg',
        link: '',
        views: '2',
        author: 'Dylan S.',
    },
    {
        title: 'Remove BG From Gif From Text Long Title Text',
        image: 'https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg',
        link: '',
        views: '2',
        author: 'Charles K.',
    },
    {
        title: 'Remove BG From PPT From Text Long Title Text',
        image: 'https://deep-image.ai/blog/content/images/2022/09/underwater-magic-world-8tyxt9yz.jpeg',
        link: '',
        views: '2',
        author: 'Dylan S. & Charles K.',
    },
  ];

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    };
    
  let displayGuides;
  switch (selectedCategory) {
    case 'how-to':
        displayGuides = howToGuides;
    break;
    case 'Upscaling Info':
        displayGuides = upscaleInfoGuides;
    break;
    case 'Other Guides':
        displayGuides = otherGuides;
    break;
    default:
        displayGuides = [];
  }

  return (
    <div id="upscaleHome_guides" className="flex flex-col items-center bg-stone-950 gap-10 py-24 px-4">
        <div id="upscaleHome_guides-optionsAndGuides" className="w-full flex flex-col items-center gap-4 max-w-[1300px]">
            <div id="upscaleHome_guides-optionsAndGuides-header" className="w-full flex justify-center">
                <h3 className="text-[44px] font-bold text-white w-full max-w-[1250px]">Upscale Guides & More!</h3>
            </div>
            <div id="upscaleHome_guides-optionsAndGuides-options" className="flex gap-4 max-w-[1250px] justify-start w-full">
                {/* "Backgrounds" category button */}
                <p
                id="categoryButton"
                className={`text-white font-bold px-5 py-1 rounded-md cursor-pointer ${
                    selectedCategory === "how-to"
                    ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-300 to-indigo-800"
                    : "bg-stone-900 hover:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] hover:from-sky-400 hover:to-indigo-900"
                }`}
                onClick={() => handleSelectCategory("how-to")}
                >
                How-To Guides
                </p>
                {/* "Upscaling Info" category button */}
                <p
                id="categoryButton"
                className={`text-white font-bold px-5 py-1 rounded-md cursor-pointer ${
                    selectedCategory === "Upscaling Info"
                    ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-300 to-indigo-800"
                    : "bg-stone-900 hover:from-sky-400 hover:to-indigo-900 hover:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]"
                }`}
                onClick={() => handleSelectCategory("Upscaling Info")}
                >
                Upscaling Info
                </p>
                {/* "Other Guides" category button */}
                <p
                id="categoryButton"
                className={`text-white font-bold px-5 py-1 rounded-md cursor-pointer ${
                    selectedCategory === "Other Guides"
                    ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-300 to-indigo-800"
                    : "bg-stone-900 hover:from-sky-400 hover:to-indigo-900 hover:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]"
                }`}
                onClick={() => handleSelectCategory("Other Guides")}
                >
                Other Guides
                </p>
            </div>

            <div id="upscaleHome_guides-optionsAndGuides-guides" className="flex flex-wrap gap-4 my-4 justify-center max-w-[1600px] w-full">
                {displayGuides.map((guide, index) => (
                    <div className="hover:from-sky-400 hover:to-indigo-900 hover:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] p-[1px] w-full md:max-w-[403px] rounded-xl cursor-pointer shadow-xl">
                        <div className="w-full flex justify-center">
                            <div key={index} className="bg-stone-900 w-full p-3 rounded-xl text-stone-200">
                                <div className=' px-1.5 pb-2'>
                                    <p className="truncate text-[20px] font-bold">{guide.title}</p>
                                    <span className='flex items-center justify-between'>
                                        <p className="text-[14px] italic">{guide.author}</p>
                                        <span className='flex items-center gap-2 text-[14px]'>
                                            <svg fill="#dedede" height="16px" width="20px" viewBox="0 0 487.55 487.55" stroke="#dedede"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="XMLID_1992_"> <path id="XMLID_2003_" d="M244.625,171.415c-40,0-72.4,32.4-72.4,72.4s32.4,72.4,72.4,72.4s72.4-32.4,72.4-72.4 C316.925,203.815,284.525,171.415,244.625,171.415z M244.625,220.215c-13,0-23.6,10.6-23.6,23.6c0,6-4.8,10.8-10.8,10.8 s-10.8-4.8-10.8-10.8c0-24.9,20.3-45.2,45.2-45.2c6,0,10.8,4.8,10.8,10.8C255.425,215.415,250.525,220.215,244.625,220.215z"></path> <path id="XMLID_2012_" d="M481.325,227.515c-224.8-258.6-428-53.9-476.4,2.8c-6.5,7.6-6.6,18.8-0.1,26.4 c221.9,259,423.4,64.6,476.5,3.7C489.625,251.015,489.625,237.015,481.325,227.515z M244.625,346.615 c-56.8,0-102.8-46-102.8-102.8s46-102.8,102.8-102.8s102.8,46,102.8,102.8S301.325,346.615,244.625,346.615z"></path> </g> </g> </g></svg>
                                            {guide.views} people viewed
                                        </span>
                                    </span>
                                </div>
                                <div className="overflow-hidden rounded-b-xl rounded-t-md w-full">
                                    <div style={{ width: '100%', paddingBottom: '40%', position: 'relative' }}>
                                        <img
                                        src={guide.image}
                                        alt={guide.title}
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div id="upscaleHome_guides-button" className="flex justify-center mt-8">
                <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900  p-[1px] w-full max-w-[240px] rounded-xl cursor-pointer group">
                <div className="hover:bg-stone-950 w-full flex justify-center rounded-xl group">
                    <p className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900  group-hover:text-transparent text-white bg-clip-text w-full font-bold text-[20px] mx-8 my-3">View More Guides</p>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Guides
