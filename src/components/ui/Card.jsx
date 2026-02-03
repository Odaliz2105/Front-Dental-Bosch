import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ 
  children, 
  className = '',
  padding = 'md',
  shadow = 'md',
  hover = false,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-lg';
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };
  
  const classes = twMerge(
    baseClasses,
    paddings[padding],
    shadows[shadow],
    hover && 'hover:shadow-lg transition-shadow duration-200',
    className
  );
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Card Header component
Card.Header = ({ children, className = '', ...props }) => {
  const classes = twMerge('border-b border-gray-200 pb-4 mb-4', className);
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Card Body component
Card.Body = ({ children, className = '', ...props }) => {
  const classes = twMerge('', className);
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Card Footer component
Card.Footer = ({ children, className = '', ...props }) => {
  const classes = twMerge('border-t border-gray-200 pt-4 mt-4', className);
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
