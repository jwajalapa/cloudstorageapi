require('dotenv').config();
const StorageServiceInterface = require('./StorageServiceInterface');
const AWS = require('aws-sdk');
const { awsCredentials, awsRegion, awsBucketName } = require('../../configs/aws');

class AWSS3StorageService extends StorageServiceInterface {
constructor() {
    super();
    AWS.config.update({
      accessKeyId: awsCredentials.accessKeyId,
      secretAccessKey: awsCredentials.secretAccessKey,
      region: awsRegion,
    });
    this.s3 = new AWS.S3();
  } 

  async createFile(filePath, fileName, fileContents) {
    const params = {
      Bucket: awsBucketName, 
      Key: `${filePath}/${fileName}`,
      Body: Buffer.from(fileContents, 'base64'),
    };

    try {
      await this.s3.upload(params).promise();
      return true;
    } catch (error) {
      console.error('Error creating file in AWS S3:', error);
      return false;
    }
  }

  async downloadFile(filePath, fileName) {

    const params = {
      Bucket: awsBucketName,
      Key: `${filePath}/${fileName}`,
    };

    try {
      const data = await this.s3.getObject(params).promise();
      return data.Body;
    } catch (error) {
      console.error('Error fetching object from AWS S3:', error);
      return null;
    }
  }

  async deleteFile(filePath, fileName) {
    const params = {
      Bucket: awsBucketName,
      Key: `${filePath}/${fileName}`,
    };

    try {
      await this.s3.headObject(params).promise();
      await this.s3.deleteObject(params).promise();
      return true;
    } catch (error) {
      if (error.code === 'NotFound') {
        return false;
      } else {
        console.error('Error deleting file from AWS S3:', error);
        return null;
      }
    }
  }
}

module.exports = AWSS3StorageService;
