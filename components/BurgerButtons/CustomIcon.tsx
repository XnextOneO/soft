import React from 'react';

interface IconProps {
    colorScheme: string;
    path: string;
  }

const CustomIcon = ({ colorScheme, path } : IconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} fill={colorScheme === 'dark' ? 'white' : '#333333'} />
    </svg>
  );
}

export default CustomIcon;