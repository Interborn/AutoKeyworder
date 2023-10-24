const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');

// File type filter function
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
    'image/gif',
  ];

  // Check if the uploaded file's MIME type is allowed
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(null, false); // Reject the file
  }
};

// Storage and upload configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/uploads/'); // Set the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Set the uploaded file's name
  },
});

// Function to upscale multiple images
async function upscaleImage(file, title) {
  const inputPath = `.\\server\\uploads\\${file.originalname}`;
  const outputPath = `.\\server\\upscaled\\${title}.jpg`;

  // Upscale the image
  return new Promise((resolve, reject) => {
    const executablePath = path.join(__dirname, '..', 'model', 'realesrgan-ncnn-vulkan');
    const cmd = `${executablePath} -i ${inputPath} -o ${outputPath}`;

    console.log(`Upscaling Image: ${file.originalname}`);
    
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing the command: ${error}`);
        reject(error);
      } else {
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        console.log(`Upscale Complete: ${file.originalname}`);
        resolve();
      }
    });
  });
}


// Export the functions and configurations for external use
module.exports = {
  fileFilter,
  storage,
  upscaleImage,
};