import React from 'react';

function LoadingSpinner({ size = 'md', fullScreen = false, text = 'Загрузка...' }) {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`animate-spin rounded-full border-b-2 border-purple-600 ${sizes[size]}`}></div>
      {text && <p className="mt-4 text-gray-500">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default LoadingSpinner;