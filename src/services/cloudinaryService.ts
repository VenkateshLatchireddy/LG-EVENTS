// Cloudinary service for image uploads
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  url: string;
  secure_url: string;
}

export const uploadToCloudinary = async (file: File): Promise<CloudinaryUploadResult> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET || '');
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const getCloudinaryUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    effect?: string;
  } = {}
): string => {
  const { width, height, crop = 'fill', quality = 'auto', effect = '' } = options;
  
  let transformations = '';
  if (width || height) {
    transformations = `/c_${crop},w_${width || ''},h_${height || ''}`;
  }
  if (effect) {
    transformations += `/e_${effect}`;
  }
  if (quality) {
    transformations += `/q_${quality}`;
  }
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload${transformations}/${publicId}`;
};
