// Unit test for AWSS3StorageService
const AWSS3StorageService = require('./AWSS3StorageService');
const { mockS3 } = require('./aws-sdk.mock');

describe('AWSS3StorageService', () => {
  let awsS3StorageService;

  beforeEach(() => {
    awsS3StorageService = new AWSS3StorageService();
  });

  it('Should create a file', async () => {
    mockS3.upload.mockReturnValueOnce({ promise: jest.fn() });
    const result = await awsS3StorageService.createFile('filePath', 'fileName', 'fileContents');
    expect(result).toBe(true);
  });

  it('should download a file', async () => {
    const result = await awsS3StorageService.downloadFile('filePath', 'fileName');
    expect(result).toEqual(Buffer.from('fileContents', 'base64'));
  });
});
