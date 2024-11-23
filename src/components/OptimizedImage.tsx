import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className = '' }) => {
  // Recommended dimensions for artist photos: 800x800px
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} w-full h-full`}
      loading="lazy"
      width={800}
      height={800}
    />
  );
};

export default OptimizedImage;
