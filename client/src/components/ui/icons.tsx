import * as React from "react";

interface IconProps {
  imageLink: string;
  className?: string;
}

export const Icons: React.FC<IconProps> = ({ imageLink, className }) => (
  <div className={className}>
    <img src={imageLink} alt="Icon" />
  </div>
);

// Example usage:
// <Icons imageLink="/path/to/spinner-icon.png" />
// <Icons imageLink="/path/to/github-icon.png" />
