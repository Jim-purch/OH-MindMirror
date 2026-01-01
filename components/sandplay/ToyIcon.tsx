import React from 'react';
import { ToyDefinition } from '../../types';

interface ToyIconProps {
  toy: ToyDefinition;
  className?: string;
  size?: number;
}

const ToyIcon: React.FC<ToyIconProps> = ({ toy, className = '', size = 24 }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`${className}`}
      style={{ color: toy.defaultColor }}
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: toy.svg }}
    />
  );
};

export default ToyIcon;
