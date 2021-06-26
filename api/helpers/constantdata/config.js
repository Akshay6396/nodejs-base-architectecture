exports.TOKEN_SECRET = process.env.TOKEN_SECRET;//sample secret  "LowRate!@#$%^&*()";


exports.AES_KEY = process.env.AES_KEY; // sample key "a263c18cbf76651ca99286b7ccb335c38fd26ba54b2956a0cd05906c03b0d9be";
exports.SERVER_KEY = process.env.SERVER_KEY; // sample key "a263c18cbf76651ca99286b7ccb335c38fd26ba54b2956a0cd05906c03b0d9be";

exports.apiVersion = process.env.AWS_API_VERSION;
exports.accessKeyId = process.env.AWS_ACCESS_KEY;
exports.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
exports.sslEnabled = true;
exports.regionEast = 'us-east-1';
exports.regionSouth = 'ap-south-1'

exports.s3apiVersion = process.env.S3_API_VERSION;
exports.s3accessKeyId = process.env.S3_ACCESS_KEY;
exports.s3secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

exports.bitlyAccessToken = process.env.BITLY_ACCESS_TOKEN;
exports.customShortnerBasePath = process.env.CUSTOMER_SHORTNER_BASE_PATH;
exports.customShortnerApiKey = process.env.CUSTOMER_SHORTNER_API_KEY;

exports.roles = {
      1: "User"
}