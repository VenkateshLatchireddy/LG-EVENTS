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

interface CloudinaryErrorResponse {
  error?: {
    message?: string;
  };
}

const getCloudinaryConfig = () => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName) {
    throw new Error(
      'Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME. Add it to .env.local before using Cloudinary.',
    );
  }

  return { cloudName, uploadPreset };
};

export const uploadToCloudinary = async (file: File): Promise<CloudinaryUploadResult> => {
  const { cloudName, uploadPreset } = getCloudinaryConfig();

  if (!uploadPreset) {
    throw new Error(
      'Missing NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET. Add an unsigned upload preset to .env.local.',
    );
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = (await response.json()) as
      | CloudinaryUploadResult
      | CloudinaryErrorResponse;

    if (!response.ok) {
      const message =
        'error' in data && data.error?.message
          ? data.error.message
          : `Cloudinary upload failed with status ${response.status}`;
      throw new Error(message);
    }

    return data as CloudinaryUploadResult;
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
  const { cloudName } = getCloudinaryConfig();
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
  
  return `https://res.cloudinary.com/${cloudName}/image/upload${transformations}/${publicId}`;
};
