import React, { useState, useEffect } from 'react'
import NavBar from '../components/global/NavBar'
import Footer from '../components/global/Footer'
import OtherProducts from '../components/global/OtherProducts'
import UpscaleImageInput from '../components/upscale-upload/UpscaleImageInput'
import ListLookView from '../components/upscale-upload/UpscaleListLookView'

const UpscaleUploadPage = () => {

  const [isUpscaled, setIsUpscaled] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isQualitySet, setIsQualitySet] = useState(false);
  
  const onUploadClicked = (files, upscaled, quality) => {
    setUploadedFiles(files);
    setIsUpscaled(upscaled);
    setIsQualitySet(quality);
  };

  return (
    <div>
      <NavBar />
      <UpscaleImageInput onUploadClicked={onUploadClicked} />
      <ListLookView 
        uploadedFiles={uploadedFiles} 
        isUpscaled={isUpscaled} 
        isQualitySet={isQualitySet} 
      />
      <OtherProducts />
      <Footer />
    </div>
  )
}

export default UpscaleUploadPage
