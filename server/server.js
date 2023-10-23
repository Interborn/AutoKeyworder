const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { fileFilter, storage, upscaleImages } = require('./imageFunctions');
const fs = require('fs');
const { exec } = require('child_process');

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS to allow cross-origin requests
app.use(cors());

// Configure multer for handling file uploads
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Function to call the Python script for keyword generation
async function generateKeywordsAndQuality(imagePath) {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = './server/everyPixelAPI.py';
    exec(`python ${pythonScriptPath} ${imagePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing the Python script: ${error}`);
        reject(error);
      } else {
        const [keywords, qualityScore] = stdout.replace(/\r\n/g, '').split('|');
        console.log(`stdout: Keywords: ${keywords}, Quality Score: ${qualityScore}`);
        console.error(`stderr: ${stderr}`);
        resolve({ keywords: keywords.trim(), qualityScore });
      }
    });
  });
}

// Define a route for handling GET requests
app.get('/', (req, res) => {
  console.log('Request received: GET /');
  res.send('Hello, world!');
});

app.post('/uploads', upload.array('folderUpload', 100), async (req, res) => {
  console.log('Request received: POST /uploads');
  
  const uploadedFiles = req.files;
  console.log('Starting image upscaling...');
  upscaleImages(uploadedFiles);

  // Update server/photoList.json for each uploaded file
  uploadedFiles.forEach(async (file, index) => {
    const imagePath = `./server/uploads/${file.originalname}`;
    const { keywords, qualityScore } = await generateKeywordsAndQuality(imagePath);

    const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2); // Calculate file size in megabytes

    const fileObject = {
      // generatedFilename: title,
      originalFilename: file.originalname,
      keywords: keywords,
      qualityScore: qualityScore,
      filesize: fileSizeInMB + ' MB',
      filepath: `/uploads/${file.originalname}`,
    };

    let photoList = [];
    try {
      const photoListData = fs.readFileSync('server/photoList.json', 'utf8');
      photoList = JSON.parse(photoListData);
    } catch (error) {
      console.error('Error reading photoList.json:', error);
    }

    const existingIndex = photoList.findIndex((entry) => entry.originalFilename === fileObject.originalFilename);

    if (existingIndex === -1) {
      photoList.push(fileObject);
      console.log(`Added file information for ${file.originalname} to photoList.json`);
    } else {
      photoList[existingIndex] = fileObject;  // Update the existing object
      console.log(`Updated file information for ${file.originalname} in photoList.json`);
    }

    fs.writeFileSync('server/photoList.json', JSON.stringify(photoList, null, 2), 'utf8');
  });

  console.log('All file information updated in photoList.json');
  res.status(200).send('Folder uploaded successfully.');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});