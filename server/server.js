const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { fileFilter, storage, upscaleImage } = require('./imageFunctions');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS to allow cross-origin requests
const corsOptions = {
  origin: function (origin, callback) {
    // Implement your logic here to allow or disallow origins
    callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/upscaled', express.static('server/upscaled'));
app.use('/uploads', express.static('server/uploads'));

// Configure multer for handling file uploads
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Helper function to sanitize titles
function sanitizeTitle(title, maxLength = 150) {
  let sanitized = title.replace(/[^\w]/g, '-'); // Replace non-word characters with hyphens
  sanitized = sanitized.replace(/-{2,}/g, '-'); // Replace consecutive hyphens with a single hyphen
  
  // Remove starting and ending hyphens if they exist
  if (sanitized.startsWith('-')) {
    sanitized = sanitized.substring(1);
  }
  if (sanitized.endsWith('-')) {
    sanitized = sanitized.substring(0, sanitized.length - 1);
  }

  return sanitized.substring(0, maxLength); // Limit the length of the title
}

// Function to call the Python script for keyword generation
async function runPythonScript(scriptPath, args = []) {
  return new Promise((resolve, reject) => {
    // Ensure args is an array and properly serialized as JSON
    args = Array.isArray(args) ? args.map(arg => JSON.stringify(arg)) : [JSON.stringify(args)];

    // Join all arguments into a command, ensuring that each argument is properly quoted
    const cmd = `python ${scriptPath} ${args.join(' ')}`;
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing the Python script: ${error}`);
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

app.get('/', (req, res) => {
  console.log('Request received: GET /');
  res.send('Hello, world!');
});

app.get('/photoList', async (req, res) => {  // Added async
  try {
    const photoListData = await fs.promises.readFile('server/photoList.json', 'utf8');  // Changed this line
    res.status(200).json(JSON.parse(photoListData));
  } catch (error) {
    console.error('Error reading photoList.json:', error);
    res.status(500).send('Error reading photoList.json');
  }
});

app.post('/update', async (req, res) => {
  console.log('Request received: POST /update');

  const updatedData = req.body;
  
  try {
    const photoListData = await fs.promises.readFile('server/photoList.json', 'utf8');
    let photoList = JSON.parse(photoListData);

    // Update the entries in photoList with the new data from updatedData
    for (const updatedFile of updatedData) {
      const index = photoList.findIndex(file => file.originalFilename === updatedFile.originalFilename);
      if (index !== -1) {
        // Update only the specified fields instead of overwriting the entire object
        photoList[index].generatedFilename = updatedFile.generatedFilename;
        photoList[index].keywords = updatedFile.keywords;
      }
    }

    // Write the updated photoList back to photoList.json
    await fs.promises.writeFile('server/photoList.json', JSON.stringify(photoList, null, 2), 'utf8');
    
    console.log('photoList.json updated successfully');
    res.status(200).send('photoList.json updated successfully');

  } catch (error) {
    console.error('Error updating photoList.json:', error);
    res.status(500).send('Error updating photoList.json');
  }
});

app.post('/uploads', upload.array('folderUpload', 100), async (req, res) => {
  console.log('Request received: POST /uploads');
  
  const uploadedFiles = req.files;
  console.log('Starting image upscaling...');

  // Log form data other than files
  console.log("Form Data:", req.body);

  const { genTitle, genKeyword, genQuality, useFilenames, upscaleImages } = req.body;

  for (const file of uploadedFiles) {
    const imagePath = `./server/uploads/${file.originalname}`;
    let sanitizedTitle = '';
    let keywords = '';
    let title = file.originalname.substring(0, file.originalname.length - 4);;
    let qualityScore = '';
    let categoryData = '';
    let categoryResult = {};
    let categoryNumber = '';
    if (keywords && keywords.length > 0) {
      categoryData = await runPythonScript('./server/getCategory.py', JSON.stringify(keywords));
      categoryResult = JSON.parse(categoryData);
      categoryNumber = categoryResult.category_number;
    }
       
    
    // This block of code should come after the genKeyword processing
    if (genKeyword === "true") {
      keywords = await runPythonScript('./server/getKeywords.py', [imagePath]);
      // Only attempt to fetch category number if keywords were generated
      if (keywords && keywords.length > 0) {
        categoryData = await runPythonScript('./server/getCategory.py', [JSON.stringify(keywords)]);
        categoryResult = JSON.parse(categoryData);
        categoryNumber = categoryResult.category_number;
      }
    }
    if (genQuality === "true") {
      qualityScore = await runPythonScript('./server/getQuality.py', [imagePath]);
    }
    if (genTitle === "true") {
      title = await runPythonScript('./server/getTitle.py', [imagePath, useFilenames]);
      sanitizedTitle = sanitizeTitle(title);
    }
const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    
    const fileObject = {
      generatedFilename: title,
      originalFilename: file.originalname,
      keywords: keywords,
      qualityScore: qualityScore,
      filesize: fileSizeInMB + ' MB',
      filepath: `/uploads/${file.originalname}`,
      upscaledFilepath: '',
      upscaledFilename: '',
      sanitizedTitle: sanitizedTitle,
      categoryNumber: categoryNumber,
    };
    
    if (upscaleImages === "true") {
      let upscaledName = genTitle === "true" ? sanitizedTitle : path.parse(file.originalname).name;
      await upscaleImage(file, upscaledName);

      // Get the size of the upscaled image 
      const upscaledStats = await fs.promises.stat(`./server/upscaled/${upscaledName}.jpg`);
      const upscaledSizeInMB = (upscaledStats.size / (1024 * 1024)).toFixed(2);

      // Update the fileObject
      fileObject.upscaledFilesize = upscaledSizeInMB + ' MB';
      fileObject.upscaledFilepath = `/upscaled/${upscaledName}.jpg`;
      fileObject.upscaledFilename = `${upscaledName}.jpg`;
      fileObject.categoryNumber = categoryResult.category_number;
    }

    // After assigning categoryResult and categoryNumber
    console.log('categoryData:', categoryData);
    console.log('categoryResult:', categoryResult);
    console.log('categoryNumber:', categoryNumber);

    let photoList = [];
    try {
      const photoListData = await fs.promises.readFile('server/photoList.json', 'utf8');  // Changed this line
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
    
    await fs.promises.writeFile('server/photoList.json', JSON.stringify(photoList, null, 2), 'utf8');
    
  }

  console.log('All file information updated in photoList.json');
  res.status(200).send('Folder uploaded successfully.');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});