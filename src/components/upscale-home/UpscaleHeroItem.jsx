import React, { useState, useEffect, useRef } from 'react';
import Atropos from 'atropos/react';
import 'atropos/atropos.css';
import nonUpscaledImage from '../../assets/nonUpscaledImage.jpg';
import upscaledImage from '../../assets/upscaledImage.jpg';

const UpscaleHeroItem = () => {
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0, bgPosX: 0, bgPosY: 0 });
    const mainRef = useRef(null);

    const handleMouseMove = (event) => {
        const rect = mainRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setEyePosition({
            x: x,
            y: y,
            bgPosX: -x + (eyeWidth / 2),
            bgPosY: -y + (eyeHeight / 2)
        });
    };

    // Adjust these values based on the actual size of your eye element
    const eyeWidth = 225;
    const eyeHeight = 225;

    // Configure Atropos for subtler movement
    return (
        <div className="flex flex-col items-center justify-center gap-4 overflow-x-hidden md:overflow-x-visible">
            <Atropos
                className=""
                onMove={({ x, y }) => setEyePosition({ ...eyePosition, x, y })}
                rotateXMax={2} // Reduce the max rotation on X-axis
                rotateYMax={2} // Reduce the max rotation on Y-axis
                shadow={false} // Disable shadow for a more subtle effect
            >
                <div
                    ref={mainRef}
                    onMouseMove={handleMouseMove}
                    className="w-[700px] h-[400px] border-3 border-white rounded-3xl bg-gray-700 relative overflow-hidden flex justify-center items-center"
                    style={{ backgroundImage: `url(${nonUpscaledImage})`, backgroundSize: '44em 25em' }}
                >
                    <div
                        className="absolute w-[225px] h-[225px] rounded-full"
                        style={{ 
                            transform: 'translate(-50%, -50%)', 
                            left: `${eyePosition.x}px`, 
                            top: `${eyePosition.y}px`, 
                            boxShadow: `0 0 0 100vh rgba(0, 0, 0, 0.02)`,
                            backgroundImage: `url(${upscaledImage})`,
                            backgroundSize: '700px 400px',
                            backgroundPosition: `${eyePosition.bgPosX}px ${eyePosition.bgPosY}px`,
                            backgroundColor: eyePosition.bgPosX === 0 && eyePosition.bgPosY === 0 ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
                        }}
                    />
                </div>
            </Atropos>
            <p className={`text-white font-mono md:flex hidden`}>Hover to see it in action!</p>
            <p className={`text-white font-mono md:hidden flex`}>Touch to see it in action!</p>
        </div>
    );
};

export default UpscaleHeroItem;
