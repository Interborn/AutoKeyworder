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
  // Assuming that your server.js is in the 'server' directory
  // and your uploads and upscaled folders are also within the 'server' directory
  const inputPath = path.join(__dirname, 'uploads', file.originalname);
  const originalExtension = path.extname(file.originalname);
  const outputPath = path.join(__dirname, 'upscaled', `${title}${originalExtension}`);

  // Ensure the path to your executable is correct
  const executablePath = path.join(__dirname, '..', 'model', 'realesrgan-ncnn-vulkan');
  const cmd = `"${executablePath}" -i "${inputPath}" -o "${outputPath}"`;

  console.log(`Upscaling Image: ${file.originalname}`);
  
  return new Promise((resolve, reject) => {
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