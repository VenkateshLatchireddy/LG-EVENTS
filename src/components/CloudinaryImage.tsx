import React from 'react';
import { AdvancedImage, lazyload, responsive } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  crop?: string;
  className?: string;
  effect?: string;
  quality?: string;
  loading?: 'lazy' | 'eager';
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  alt,
  width,
  height,
  crop = 'fill',
  className = '',
  effect = '',
  quality = 'auto',
  loading = 'lazy'
}) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your_cloud_name';
  
  // Create a Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName
    }
  });
  
  // Get the image
  let image = cld.image(publicId);
  
  // Apply transformations
  if (width || height) {
    image = image.resize(
      width && height 
        ? { width: width, height: height, crop: crop }
        : width ? { width: width, crop: crop } : { height: height, crop: crop }
    );
  }
  
  if (quality) {
    image = image.quality(quality);
  }
  
  if (effect) {
    image = image.effect(effect);
  }
  
  return (
    <AdvancedImage 
      cldImg={image} 
      alt={alt}
      className={className}
      plugins={loading === 'lazy' ? [lazyload(), responsive()] : [responsive()]}
    />
  );
};

export default CloudinaryImage;