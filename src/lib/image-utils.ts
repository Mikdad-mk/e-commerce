// Base64 image utilities for local storage

// Helper function to convert File to base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

// Helper function to validate image file
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'
    };
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File too large. Maximum size is 5MB.'
    };
  }

  return { valid: true };
}

// Helper function to compress base64 image with better quality balance
export function compressBase64Image(
  base64: string, 
  maxWidth: number = 800,    // Increased for better quality
  quality: number = 0.8      // Increased quality
): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions maintaining aspect ratio
      let { width, height } = img;
      
      // Smart resizing - only resize if image is larger than maxWidth
      const maxDimension = Math.max(width, height);
      if (maxDimension > maxWidth) {
        const ratio = maxWidth / maxDimension;
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Use better image smoothing for quality
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
      }
      
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    
    img.src = base64;
  });
}

// High compression with good quality balance
export function ultraCompressBase64Image(
  base64: string, 
  maxWidth: number = 600,    // Increased for better quality
  quality: number = 0.7      // Improved quality while still compressing
): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      let { width, height } = img;
      
      // Smart resizing with better quality preservation
      const maxDimension = Math.max(width, height);
      if (maxDimension > maxWidth) {
        const ratio = maxWidth / maxDimension;
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Use high quality smoothing
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
      }
      
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    
    img.src = base64;
  });
}

// Helper function to get detailed storage breakdown
export function getDetailedStorageUsage(): {
  total: { used: number; available: number; percentage: number };
  breakdown: { key: string; size: number; type: string }[];
  recommendations: string[];
} {
  try {
    let totalSize = 0;
    const breakdown: { key: string; size: number; type: string }[] = [];
    
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const value = localStorage[key];
        const size = value.length;
        totalSize += size;
        
        let type = 'Other';
        if (key === 'avenzo_products') type = 'Products Data';
        else if (key.startsWith('image_')) type = 'Base64 Images';
        else if (key.includes('auth')) type = 'Authentication';
        
        breakdown.push({
          key,
          size: Math.round(size / 1024), // Convert to KB
          type
        });
      }
    }
    
    // Sort by size (largest first)
    breakdown.sort((a, b) => b.size - a.size);
    
    const estimatedLimit = 5 * 1024 * 1024; // 5MB in bytes
    const usedMB = (totalSize / 1024 / 1024);
    const availableMB = ((estimatedLimit - totalSize) / 1024 / 1024);
    const percentage = Math.round((totalSize / estimatedLimit) * 100);
    
    // Generate recommendations
    const recommendations: string[] = [];
    if (percentage > 90) {
      recommendations.push("Critical: Delete some products immediately");
      recommendations.push("Consider migrating to cloud storage");
    } else if (percentage > 70) {
      recommendations.push("Warning: Approaching storage limit");
      recommendations.push("Compress images more aggressively");
    } else if (percentage > 50) {
      recommendations.push("Consider optimizing image sizes");
    }
    
    // Calculate realistic capacity
    const avgImageSize = breakdown
      .filter(item => item.type === 'Base64 Images')
      .reduce((sum, item) => sum + item.size, 0) / 
      breakdown.filter(item => item.type === 'Base64 Images').length || 0;
    
    if (avgImageSize > 0) {
      const remainingSpace = availableMB * 1024; // Convert to KB
      const estimatedImagesLeft = Math.floor(remainingSpace / avgImageSize);
      recommendations.push(`Estimated capacity: ~${estimatedImagesLeft} more images like current ones`);
    }
    
    return {
      total: {
        used: Math.round(usedMB * 100) / 100,
        available: Math.round(availableMB * 100) / 100,
        percentage: Math.min(percentage, 100)
      },
      breakdown,
      recommendations
    };
  } catch (error) {
    return {
      total: { used: 0, available: 5, percentage: 0 },
      breakdown: [],
      recommendations: ['Error reading storage']
    };
  }
}

// Helper function to check if storage is getting full
export function isStorageNearLimit(): boolean {
  const usage = getStorageUsage();
  return usage.percentage > 80; // Warning at 80%
}

// Helper function to estimate image size before upload
export function estimateBase64Size(file: File): number {
  // Base64 is approximately 33% larger than original
  return Math.round(file.size * 1.33);
}

// Helper function to generate a unique filename
export function generateImageId(): string {
  return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to get image dimensions from base64
export function getImageDimensions(base64: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = base64;
  });
}

// Helper function to create thumbnail from base64 with better quality
export function createThumbnail(
  base64: string, 
  size: number = 200  // Increased default size
): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      
      // Calculate crop dimensions for square thumbnail
      const minDim = Math.min(img.width, img.height);
      const x = (img.width - minDim) / 2;
      const y = (img.height - minDim) / 2;
      
      // Use high quality smoothing for thumbnails
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, x, y, minDim, minDim, 0, 0, size, size);
      }
      
      const thumbnail = canvas.toDataURL('image/jpeg', 0.85); // Better thumbnail quality
      resolve(thumbnail);
    };
    
    img.src = base64;
  });
}

// Storage utilities for managing base64 images
export const imageStorage = {
  // Save image to localStorage (for demo purposes)
  save: (id: string, base64: string): void => {
    try {
      localStorage.setItem(`image_${id}`, base64);
    } catch (error) {
      console.error('Failed to save image to localStorage:', error);
    }
  },

  // Get image from localStorage
  get: (id: string): string | null => {
    try {
      return localStorage.getItem(`image_${id}`);
    } catch (error) {
      console.error('Failed to get image from localStorage:', error);
      return null;
    }
  },

  // Delete image from localStorage
  delete: (id: string): void => {
    try {
      localStorage.removeItem(`image_${id}`);
    } catch (error) {
      console.error('Failed to delete image from localStorage:', error);
    }
  },

  // List all stored images
  list: (): string[] => {
    try {
      const keys = Object.keys(localStorage);
      return keys.filter(key => key.startsWith('image_')).map(key => key.replace('image_', ''));
    } catch (error) {
      console.error('Failed to list images from localStorage:', error);
      return [];
    }
  }
};

// Upload function with improved compression options
export async function uploadBase64Image(
  file: File,
  compress: boolean = true,
  compressionLevel: 'normal' | 'high' | 'ultra' = 'high'
): Promise<{ id: string; base64: string; thumbnail?: string; originalSize: number; compressedSize: number }> {
  // Validate file
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Convert to base64
  let base64 = await fileToBase64(file);
  const originalSize = base64.length;
  
  // Apply compression based on level with improved settings
  if (compress) {
    switch (compressionLevel) {
      case 'ultra':
        base64 = await ultraCompressBase64Image(base64, 600, 0.7); // Better quality
        break;
      case 'high':
        base64 = await compressBase64Image(base64, 800, 0.8); // High quality
        break;
      case 'normal':
        base64 = await compressBase64Image(base64, 1000, 0.9); // Near original quality
        break;
    }
  }

  // Generate unique ID
  const id = generateImageId();
  
  // Create thumbnail with good quality
  const thumbnail = await createThumbnail(base64, 200); // Larger thumbnail
  
  // Save to storage (in a real app, you'd save to a database)
  imageStorage.save(id, base64);
  imageStorage.save(`${id}_thumb`, thumbnail);
  
  return { 
    id, 
    base64, 
    thumbnail,
    originalSize,
    compressedSize: base64.length
  };
}