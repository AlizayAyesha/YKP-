import React from 'react';

type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  pictureClassName?: string;
};

function webpFor(src: string): string | null {
  if (!/\.(png|jpe?g)$/i.test(src)) return null;
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return null;
  return src.replace(/\.(png|jpe?g)$/i, '.webp');
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className,
  pictureClassName,
  loading = 'lazy',
  decoding = 'async',
  ...rest
}) => {
  const webp = webpFor(src);
  const img = (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );

  if (!webp) return img;

  return (
    <picture className={pictureClassName ?? 'contents'}>
      <source srcSet={webp} type="image/webp" />
      {img}
    </picture>
  );
};
