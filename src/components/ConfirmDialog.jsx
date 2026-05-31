import React from 'react';
import { createPortal } from 'react-dom';

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Да', cancelText = 'Нет' }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 animate-scaleIn">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ConfirmDialog;