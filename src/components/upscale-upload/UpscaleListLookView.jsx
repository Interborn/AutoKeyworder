import React, { useEffect, useState } from 'react';
import discord from '../../assets/discord.png';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import messenger from '../../assets/messenger.png';
import pinterest from '../../assets/pinterest.png';
import reddit from '../../assets/reddit.png';
import twitter from '../../assets/twitter.png';
import whatsapp from '../../assets/whatsapp.png';
import discordhover from '../../assets/discordhovered.png';
import facebookhover from '../../assets/facebookhovered.png';
import instagramhover from '../../assets/instagramhovered.png';
import messengerhover from '../../assets/messengerhovered.png';
import pinteresthover from '../../assets/pinteresthovered.png';
import reddithover from '../../assets/reddithovered.png';
import twitterhover from '../../assets/twitterhovered.png';
import whatsapphover from '../../assets/whatsapphovered.png';

function ListLookView({ uploadedFiles, isUpscaled, isTitleSet }) {
  const serverOrigin = `${window.location.protocol}//${window.location.hostname}:3001`;

  // Initialize selectedQuality state with 'upscaled' for all items
  const [selectedQuality, setSelectedQuality] = useState({});
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIcon, setHoveredIcon] = useState('');

  // Array of social media information
  const socialMedia = [
    { name: 'discord', src: discord, alt: discordhover },
    { name: 'facebook', src: facebook, alt: facebookhover },
    { name: 'instagram', src: instagram, alt: instagramhover },
    { name: 'messenger', src: messenger, alt: messengerhover },
    { name: 'pinterest', src: pinterest, alt: pinteresthover },
    { name: 'reddit', src: reddit, alt: reddithover },
    { name: 'twitter', src: twitter, alt: twitterhover },
    { name: 'whatsapp', src: whatsapp, alt: whatsapphover },
  ];

  // Handle mouse enter and leave events
  const handleMouseEnter = (index) => setIsZoomed({ ...isZoomed, [index]: true });
  const handleMouseLeave = (index) => setIsZoomed({ ...isZoomed, [index]: false });

  const handleMouseMove = (event, index) => {
    const rect = event.target.getBoundingClientRect();
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;
  
    setMousePosition({
      x: xPercent,
      y: yPercent
    });
  };

  // Set the default value for selectedQuality based on the index
  useEffect(() => {
    const defaultQuality = 'upscaled';
    const defaultSelectedQuality = {};
    uploadedFiles.forEach((_, index) => {
      defaultSelectedQuality[index] = defaultQuality;
    });
    setSelectedQuality(defaultSelectedQuality);
  }, [uploadedFiles]);

  // Function to handle quality choice button click
  const handleQualityChoiceClick = (index, quality) => {
    setSelectedQuality({ ...selectedQuality, [index]: quality });
  };

  const renderSocialMediaIcons = (listIndex) => (
    socialMedia.map(media => (
      <div key={media.name}>
        <img
          src={hoveredIcon === `${listIndex}-${media.name}` ? media.alt : media.src}
          onMouseEnter={() => setHoveredIcon(`${listIndex}-${media.name}`)}
          onMouseLeave={() => setHoveredIcon('')}
          className="p-2.5 rounded-full shadow-md hover:shadow-lg hover:bg-indigo-100 cursor-not-allowed"
          width={50}
          alt={media.name}
        />
      </div>
    ))
  );

  // Function to handle the image download
  const handleDownload = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl); // Clean up the URL object
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };
  
  return (
    <div id="listLiveView" encType="multipart/form-data" className="w-full bg-stone-950">
      <ul id="listLiveView-container" className="w-full h-full flex flex-col items-center justify-center gap-8 relative">

        {uploadedFiles.map((file, index) => {
          let originalFilename = file.originalFilename;
          let upscaledFilename = file.upscaledFilename;

          const originalImageUrl = `${serverOrigin}/uploads/${file.originalFilename}`;
          const upscaledImageUrl = `${serverOrigin}/upscaled/${file.upscaledFilename}`;
          const isLoading = file.isLoading;

          return (
            <li id={`listLiveView-item${index}`} key={index} className="flex flex-col max-w-[1300px] mx-4 xl:mx-20 w-full h-full bg-indigo-50 py-20 px-12 rounded-md">
              {file.isLoading ? (
                <div className='flex justify-around gap-20 w-full'>
                  <div className="spinningLoader"></div>
                </div>
              
              ) : (
                <div className='flex justify-around gap-20 w-full'>
                  <div className='flex justify-around gap-10 w-[75%]'>
                    <div className='flex flex-col items-center gap-5 w-full h-full'>
                      <h3 className='w-full max-w-[21.25em] font-bold text-[30px]'>Original Image</h3>
                      <div 
                        onMouseEnter={() => handleMouseEnter(index)} 
                        onMouseLeave={() => handleMouseLeave(index)} 
                        onMouseMove={(event) => handleMouseMove(event, index)}
                        className={`overflow-hidden h-full ${isZoomed[index] ? 'zoomed' : ''}`}
                      >
                        <img 
                          src={originalImageUrl} 
                          alt={originalFilename} 
                          className="object-cover w-full h-full" 
                          style={{
                            transform: isZoomed[index] ? `scale(4)` : 'none',
                            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                          }}
                        />
                      </div>
                    </div>
                    <div className='flex flex-col items-center gap-5 w-full h-full'>
                      <h3 className='w-full max-w-[21.25em] font-bold text-[30px]'>Upscaled Image</h3>
                      <div 
                        onMouseEnter={() => handleMouseEnter(index)} 
                        onMouseLeave={() => handleMouseLeave(index)} 
                        onMouseMove={(event) => handleMouseMove(event, index)}
                        className={`overflow-hidden h-full ${isZoomed[index] ? 'zoomed' : ''}`}
                      >
                        <img 
                          src={upscaledImageUrl} 
                          alt={upscaledFilename} 
                          className="object-cover w-full h-full" 
                          style={{
                            transform: isZoomed[index] ? `scale(4)` : 'none',
                            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  
                  <div className='w-[25%] flex flex-col justify-around items-center gap-8'>
                    <div className='flex justify-center w-full mx-4 md:mx-20 gap-5'>
                      <h4
                        className={`flex justify-center items-center hover:shadow-lg shadow-md py-2 px-6 rounded-3xl font-semibold text-[20px] text-white bg-indigo-300 hover:bg-indigo-400 transition-all duration-200 ease-in-out ${selectedQuality[index] === 'original' ? 'bg-indigo-600 hover:bg-indigo-600 cursor-default' : 'cursor-pointer'}`}
                        onClick={() => handleQualityChoiceClick(index, 'original')}
                      >
                        Original
                      </h4>
                      <h4
                        className={`flex justify-center items-center hover:shadow-lg shadow-md py-2 px-6 rounded-3xl font-semibold text-[20px] text-white bg-indigo-300 hover:bg-indigo-400 transition-all duration-200 ease-in-out ${selectedQuality[index] === 'upscaled' ? 'bg-indigo-600 hover:bg-indigo-600 cursor-default' : 'cursor-pointer'}`}
                        onClick={() => handleQualityChoiceClick(index, 'upscaled')}
                      >
                        Upscaled
                      </h4>
                    </div>
                    <div className='flex flex-col items-center w-full gap-2'>
                      <p className='px-6 py-2 bg-indigo-300 ring-[2.5px] ring-indigo-500 font-semibold text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-stone-200 hover:ring-indigo-600 transition-all duration-200 ease-in-out cursor-pointer w-full text-center'
                        onClick={() => handleDownload(
                          selectedQuality[index] === 'original' ? originalImageUrl : upscaledImageUrl,
                          selectedQuality[index] === 'original' ? originalFilename : upscaledFilename
                        )}
                      >
                        Download
                      </p>
                      <p>{selectedQuality[index] === 'original' ? `${file.originalWidth} x ${file.originalHeight}` : `${file.upscaledWidth} x ${file.upscaledHeight}`}</p>
                    </div>
                    <div className='flex flex-wrap justify-between gap-x-4 gap-y-4'>
                      {renderSocialMediaIcons(index)}
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

    </div>
  );
}

export default ListLookView;
