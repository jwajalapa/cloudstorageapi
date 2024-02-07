# Cloud Storage API

This project provides a simple abstraction for interacting with cloud storage services. Currently, it supports AWS S3 storage, and it can be extended to support other services like Azure Blob Storage or Google Cloud Storage.

## Installation  
- Clone this repo  
- Navigate to the project directory and run:  
npm install  

## Configuration 
Create a .env file in the root directory with the following content:  
AWS_ACCESS_KEY_ID=your-access-key-id  
AWS_SECRET_ACCESS_KEY=your-secret-access-key  
AWS_REGION=your-region  
AWS_BUCKET_NAME=your-bucket-name  

## Test
Run the following for the unit test  
npm test

## Usage 
Create a file:  
curl -X POST -H "Content-Type: application/json" -d '{"connectionName": "yourConnectionName", "filePath": "files", "fileName": "test2.txt", "fileContents": "VGhpcyBpcyBCYXNlIDY0IGVuY29kZWQgdGVzdCBkYXRhLg=="}' http://localhost:3000/api/files/create-file

Download a file:  
curl http://localhost:3000/api/files/download-file/cloudmersive-test/files/test2.txt -o downloaded_test.txt

Delete a file:  
curl -X DELETE http://localhost:3000/api/files/delete-file/cloudmersive-test/files/test2.txt
