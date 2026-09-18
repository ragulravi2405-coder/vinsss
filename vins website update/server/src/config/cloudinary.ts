import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const apiKey = process.env.CLOUDINARY_API_KEY || process.env.VITE_CLOUDINARY_API_KEY || '';
const apiSecret = process.env.CLOUDINARY_API_SECRET || '';

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
  console.log(`☁️  Cloudinary Configured: cloud_name=${cloudName}`);
} else if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    secure: true,
  });
  console.log('☁️  Cloudinary Configured via CLOUDINARY_URL');
} else {
  console.log('ℹ️  Cloudinary credentials not found in env — local data URI fallback active.');
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) ||
    process.env.CLOUDINARY_URL
  );
}

export default cloudinary;
