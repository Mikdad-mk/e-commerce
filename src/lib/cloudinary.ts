import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (server-side only)
if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Upload image to Cloudinary using unsigned upload
export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  // Use a default unsigned upload without preset
  formData.append('upload_preset', 'ml_default');
  
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Cloudinary upload error:', errorData);
      throw new Error(`Cloudinary upload failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Upload to Cloudinary failed:', error);
    throw error;
  }
}

// Alternative: Upload using signed upload (more secure)
export async function uploadToCloudinarySecure(file: File): Promise<string> {
  try {
    // Convert file to base64 for server-side upload
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'avenzo_products',
      resource_type: 'image',
    });

    return result.secure_url;
  } catch (error) {
    console.error('Secure upload to Cloudinary failed:', error);
    throw error;
  }
}

// Delete image from Cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
}

// Get optimized image URL
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  } = {}
): string {
  const { width = 800, height, quality = 'auto', format = 'auto' } = options;
  
  let transformation = `q_${quality},f_${format}`;
  
  if (width) transformation += `,w_${width}`;
  if (height) transformation += `,h_${height},c_fill`;
  
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
}

// Extract public ID from Cloudinary URL
export function extractPublicId(cloudinaryUrl: string): string {
  const parts = cloudinaryUrl.split('/');
  const filename = parts[parts.length - 1];
  return filename.split('.')[0];
}

// Validate image file
export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Please upload JPEG, PNG, WebP, or GIF images.',
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size too large. Please upload images smaller than 5MB.',
    };
  }

  return { isValid: true };
}