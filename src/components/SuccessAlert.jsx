import React, { useEffect } from 'react';

function SuccessAlert({ message, onClose, autoClose = 3000 }) {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  if (!message) return null;

  return (
    <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 mb-4 animate-slideDown">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-green-700">{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-sm text-green-600 hover:text-green-800">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SuccessAlert;