const express = require('express');
const multer = require('multer');
const cors = require('cors');
const archiver = require('archiver');
const { fileFilter, storage, upscaleImage } = require('./imageFunctions');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const { Parser } = require('json2csv');
const util = require('util');
const copyFile = util.promisify(fs.copyFile);
const sizeOf = require('image-size');

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

// Helper function to get the latest CSV index and count
async function getLatestCsvFileInfo(csvDir, baseFilename) {
  let currentCSVIndex = -1;
  let currentRecordCount = 0;
  
  try {
    const files = await fs.promises.readdir(csvDir);
    const csvFiles = files
      .filter(file => file.startsWith(baseFilename) && file.endsWith('.csv'))
      .sort();
    
    if (csvFiles.length > 0) {
      const latestFile = csvFiles[csvFiles.length - 1];
      currentCSVIndex = parseInt(latestFile.match(/_(\d+)\.csv$/)[1]);
      
      const latestFileContents = await fs.promises.readFile(path.join(csvDir, latestFile), 'utf8');
      currentRecordCount = latestFileContents.trim().split('\n').length - 1; // Subtract header line
    }
  } catch (error) {
    console.error('Error getting the latest CSV file info:', error);
  }

  return { currentCSVIndex, currentRecordCount };
}

app.get('/generate-csv', async (req, res) => {
  try {
    // Read the existing photo list
    const photoListData = await fs.promises.readFile('server/photoList.json', 'utf8');
    const photoList = JSON.parse(photoListData);

    // Ensure the directory exists before writing the file
    const csvDir = path.join(__dirname, 'batchBarn', 'csvFiles');
    await fs.promises.mkdir(csvDir, { recursive: true });

    // Fields for the CSV
    const fields = ['upscaledFilename', 'generatedFilename', 'keywords', 'categoryNumber'];
    const baseFilename = 'adobeMetadata_';
    
    // Initialize CSV parser
    const json2csvParser = new Parser({ fields });

    // Define max records per CSV, excluding header
    const maxRecordsPerCSV = 95;

    // Get the latest CSV file index and record count
    let { currentCSVIndex, currentRecordCount } = await getLatestCsvFileInfo(csvDir, baseFilename);
    let currentCSVFilePath;

    if (currentCSVIndex === -1 || currentRecordCount >= maxRecordsPerCSV) {
      // If no file exists or the latest file is full, create a new one
      currentCSVIndex++;
      currentRecordCount = 0; // Reset record count for the new file
    }
    currentCSVFilePath = path.join(csvDir, `${baseFilename}${currentCSVIndex}.csv`);

    for (const record of photoList) {
      if (currentRecordCount >= maxRecordsPerCSV) {
        // Move to the next CSV file
        currentCSVIndex++;
        currentCSVFilePath = path.join(csvDir, `${baseFilename}${currentCSVIndex}.csv`);
        currentRecordCount = 0; // Reset record count for the new file
      }
    
      const csvData = json2csvParser.parse([record], { header: currentRecordCount === 0 });
    
      if (currentRecordCount === 0) {
        // If it's the start of a new CSV, write with header
        await fs.promises.writeFile(currentCSVFilePath, csvData);
      } else {
        // If appending, ensure to add newline and skip header
        await fs.promises.appendFile(currentCSVFilePath, '\n' + csvData.split('\n')[1]);
      }
    
      currentRecordCount++; // Increment after each record is processed
    
      const destinationImageDir = path.join(__dirname, 'batchBarn', 'batchImages', `adobeMetadata_${currentCSVIndex}`);
      await fs.promises.mkdir(destinationImageDir, { recursive: true });
      const sourceImagePath = path.join(__dirname, 'upscaled', record.upscaledFilename);
      const destinationImagePath = path.join(destinationImageDir, record.upscaledFilename);
      
      // Check if source image exists
      if (fs.existsSync(sourceImagePath)) {
        // If the source image exists, proceed with copying
        console.log(`Copying from ${sourceImagePath} to ${destinationImagePath}`);
        await copyFile(sourceImagePath, destinationImagePath);
        console.log(`Copied ${record.upscaledFilename} successfully.`);
      } else {
        // If the source image does not exist, log an error
        console.error(`Source image not found at ${sourceImagePath}`);
      }      
    }

    console.log('CSV file(s) created/updated successfully.');
    res.status(200).send('CSV file(s) created/updated successfully.');

  } catch (error) {
    console.error('Error generating CSV file:', error);
    res.status(500).send('Error generating CSV file');
  }
});

app.get('/download-records', async (req, res) => {
  // Create a zip archive using archiver
  const archive = archiver('zip', { zlib: { level: 9 } });

  // Set the archive name
  const archiveName = `records_${Date.now()}.zip`;
  res.attachment(archiveName);

  // Pipe the archive to the response
  archive.pipe(res);

  try {
    const csvDir = path.join(__dirname, 'batchBarn', 'csvFiles');
    const batchImagesDir = path.join(__dirname, 'batchBarn', 'batchImages');

    // Get all CSV files
    const csvFiles = await fs.promises.readdir(csvDir);

    for (const file of csvFiles) {
      if (path.extname(file) === '.csv') {
        // Add CSV file to the archive
        archive.file(path.join(csvDir, file), { name: file });

        // Add associated image directory to the archive
        let imageFolder = path.basename(file, '.csv');
        archive.directory(path.join(batchImagesDir, imageFolder), imageFolder);
      }
    }

    // Finalize the archive (this is important to end the stream)
    archive.finalize();
  } catch (error) {
    res.status(500).send(`Error creating zip file: ${error}`);
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

    // Get the dimensions of the image
    const originalDimensions = sizeOf(`./server/uploads/${file.originalname}`);
    
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
      originalWidth: originalDimensions.width,
      originalHeight: originalDimensions.height,
    };
    
    if (upscaleImages === "true") {
      let upscaledName = genTitle === "true" ? sanitizedTitle : path.parse(file.originalname).name;
      await upscaleImage(file, upscaledName);

      // Get the size of the upscaled image 
      const upscaledStats = await fs.promises.stat(`./server/upscaled/${upscaledName}.jpg`);
      const upscaledSizeInMB = (upscaledStats.size / (1024 * 1024)).toFixed(2);
      const upscaledDimensions = sizeOf(`./server/upscaled/${upscaledName}.jpg`);

      // Update the fileObject
      fileObject.upscaledFilesize = upscaledSizeInMB + ' MB';
      fileObject.upscaledFilepath = `/upscaled/${upscaledName}.jpg`;
      fileObject.upscaledFilename = `${upscaledName}.jpg`;
      fileObject.categoryNumber = categoryResult.category_number;
      fileObject.upscaledWidth = upscaledDimensions.width;
      fileObject.upscaledHeight = upscaledDimensions.height;
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