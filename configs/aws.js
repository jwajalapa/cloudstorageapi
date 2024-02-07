const awsCredentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const awsRegion = process.env.AWS_REGION;
const awsBucketName = process.env.AWS_BUCKET_NAME;

module.exports = { awsCredentials, awsRegion, awsBucketName };
