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

// Helper function to compress base64 image (optional)
export function compressBase64Image(
  base64: string, 
  maxWidth: number = 600,  // Reduced from 800
  quality: number = 0.7    // Reduced from 0.8
): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    
    img.src = base64;
  });
}

// Helper function to get storage usage
export function getStorageUsage(): { used: number; available: number; percentage: number } {
  try {
    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length;
      }
    }
    
    // Estimate available space (5MB typical limit)
    const estimatedLimit = 5 * 1024 * 1024; // 5MB in bytes
    const usedMB = (totalSize / 1024 / 1024).toFixed(2);
    const availableMB = ((estimatedLimit - totalSize) / 1024 / 1024).toFixed(2);
    const percentage = Math.round((totalSize / estimatedLimit) * 100);
    
    return {
      used: parseFloat(usedMB),
      available: parseFloat(availableMB),
      percentage: Math.min(percentage, 100)
    };
  } catch (error) {
    return { used: 0, available: 5, percentage: 0 };
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

// Helper function to create thumbnail from base64
export function createThumbnail(
  base64: string, 
  size: number = 150
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
      
      ctx?.drawImage(img, x, y, minDim, minDim, 0, 0, size, size);
      const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
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

// Upload function that converts file to base64 and stores it
export async function uploadBase64Image(
  file: File,
  compress: boolean = true
): Promise<{ id: string; base64: string; thumbnail?: string }> {
  // Validate file
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Convert to base64
  let base64 = await fileToBase64(file);
  
  // Compress if requested
  if (compress) {
    base64 = await compressBase64Image(base64);
  }

  // Generate unique ID
  const id = generateImageId();
  
  // Create thumbnail
  const thumbnail = await createThumbnail(base64);
  
  // Save to storage (in a real app, you'd save to a database)
  imageStorage.save(id, base64);
  imageStorage.save(`${id}_thumb`, thumbnail);
  
  return { id, base64, thumbnail };
}