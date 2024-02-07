const express = require('express');
const bodyParser = require('body-parser');
const AWSS3StorageService = require('./services/AWSS3StorageService');
const AzureBlobStorageService = require('./services/AzureBlobStorageService'); 

const app = express();
const port = 3000;

// Use body-parser middleware
app.use(bodyParser.json());

// Determine which storage service to use. I'm hardcoding this to use AWS S3 for now. 
// If we want user to pass this through connectionName, we can simply initialize this later in the code.
const useAWSS3 = true;

// Initialize the chosen storage service
const storageService = useAWSS3 ? new AWSS3StorageService() : new AzureBlobStorageService();

// Endpoint to create a file in S3
app.post('/api/files/create-file', async (req, res) => {
  const { connectionName, filePath, fileName, fileContents } = req.body;
  const result = await storageService.createFile(filePath, fileName, fileContents);

  if (result) {
    res.json({ successful: true });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to download a file from S3
app.get('/api/files/download-file/:connectionName/:filePath/:fileName', async (req, res) => {
  const { connectionName, filePath, fileName } = req.params;
  const data = await storageService.downloadFile(filePath, fileName);

  if (data !== null) {
    res.send(data);
  } else {
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to delete a file from S3
app.delete('/api/files/delete-file/:connectionName/:filePath/:fileName', async (req, res) => {
  const { connectionName, filePath, fileName } = req.params;
  const result = await storageService.deleteFile(filePath, fileName);

  if (result !== null) {
    res.json({ successful: result });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
