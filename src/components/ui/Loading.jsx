import React from 'react';

const Loading = ({ 
  size = 'md',
  text = 'Cargando...',
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`} {...props}>
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}></div>
      {text && (
        <p className="mt-2 text-sm text-gray-600">{text}</p>
      )}
    </div>
  );
};

// Skeleton loader component
Loading.Skeleton = ({ 
  lines = 3, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-3 ${className}`} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        ></div>
      ))}
    </div>
  );
};

// Card skeleton component
Loading.CardSkeleton = ({ 
  count = 1,
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
