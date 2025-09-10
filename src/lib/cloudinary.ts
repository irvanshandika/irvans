import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload an image to Cloudinary
 * @param file The file buffer to upload
 * @param folder The folder to upload to (optional)
 * @returns The Cloudinary upload response
 */
export async function uploadImageToCloudinary(buffer: Buffer, options: {
  folder?: string;
  public_id?: string;
} = {}) {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: options.folder || 'portfolio/projects',
      public_id: options.public_id,
      overwrite: true,
      resource_type: 'image'
    };

    cloudinary.uploader.upload_stream(
      { ...uploadOptions, resource_type: 'image' as const },
      (error, result) => {
      if (error) return reject(error);
      resolve(result);
    }).end(buffer);
  });
}

/**
 * Delete an image from Cloudinary
 * @param publicId The public ID of the image to delete
 * @returns The Cloudinary deletion response
 */
export async function deleteImageFromCloudinary(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}

/**
 * Extract public ID from Cloudinary URL
 * @param url The Cloudinary URL
 * @returns The public ID
 */
export function getPublicIdFromUrl(url: string): string | null {
  // Example URL: https://res.cloudinary.com/cloud-name/image/upload/v1631234567/portfolio/projects/abcdef123456
  // We want to extract: portfolio/projects/abcdef123456
  
  if (!url || !url.includes('cloudinary.com')) {
    return null;
  }
  
  try {
    const urlParts = url.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    
    if (uploadIndex === -1 || uploadIndex + 2 >= urlParts.length) {
      return null;
    }
    
    // Skip the version part (v1631234567) and join the rest
    return urlParts.slice(uploadIndex + 2).join('/');
  } catch (error) {
    console.error('Error extracting public ID from URL:', error);
    return null;
  }
}