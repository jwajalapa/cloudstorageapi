// AWS sdk mock for test
const mockS3 = {
  upload: jest.fn().mockReturnThis(),
  promise: jest.fn(),
  getObject: jest.fn().mockReturnThis(),
  headObject: jest.fn().mockReturnThis(),
  deleteObject: jest.fn().mockReturnThis(),
};

jest.mock('aws-sdk', () => ({
  S3: jest.fn(() => mockS3),
  config: {
    update: jest.fn(),
  },
}));

module.exports = { mockS3 };
