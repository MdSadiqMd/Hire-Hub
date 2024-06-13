import Image from 'next/image';
import * as React from 'react';

interface IconProps {
  imageLink: string;
  className?: string;
}

export const Icons: React.FC<IconProps> = ({ imageLink, className }) => (
  <div className={className}>
    <Image src={imageLink} alt="Icon" width={undefined} height={undefined} />
  </div>
);

// Example usage:
// <Icons imageLink="/path/to/spinner-icon.png" />
// <Icons imageLink="/path/to/github-icon.png" />
