import type { ImgHTMLAttributes } from 'react';

interface LogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
}

const Logo = ({ alt = 'Grandee Online', ...props }: LogoProps) => (
  <img src="/grandee%20online%20logo.jpeg" alt={alt} {...props} />
);

export default Logo;
