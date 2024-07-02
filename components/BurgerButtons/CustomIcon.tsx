import React, { useEffect, useState } from 'react';

interface IconProps {
    colorScheme: string;
    path: string;
  }

const CustomIcon = ({ colorScheme, path } : IconProps) => {
	const [iconColorState, setIconColorState] = useState<string>("");
  useEffect(() => {
      colorScheme === 'dark' ? setIconColorState('white') : setIconColorState('#333333')
  }, [colorScheme])


  return (
    <svg
      width="60"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} fill={iconColorState} />
    </svg>
  );
}

export default CustomIcon;