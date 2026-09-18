import { Request, Response } from 'express';
import cloudinary, { isCloudinaryConfigured } from '../config/cloudinary.js';

export async function uploadMedia(req: Request, res: Response) {
  try {
    const { image, folder = 'vins_college' } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Image data (base64 data URI or image URL) is required',
      });
    }

    if (!isCloudinaryConfigured()) {
      // Cloudinary is not yet configured with API secret, return the image data directly
      return res.json({
        success: true,
        url: image,
        isCloudinary: false,
        message: 'Cloudinary not configured with secret; using data URI directly.',
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder,
      resource_type: 'auto',
    });

    return res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes,
      isCloudinary: true,
      message: 'Image uploaded successfully to Cloudinary',
    });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Cloudinary upload failed',
      error: error.message,
    });
  }
}
