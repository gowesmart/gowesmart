'use client';

import { useState } from 'react';

const Popup = ({ title, type, message, children }) => {
  const [isVisible, setIsVisible] = useState(true);

  const onClose = () => {
    setIsVisible(false);
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <i className="text-red-500 fas fa-times"></i>;
      case 'warning':
        return <i className="text-yellow-500 fas fa-exclamation-triangle"></i>;
      case 'success':
        return <i className="text-green-500 fas fa-check"></i>;
      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-black bg-black bg-opacity-50" onClick={onClose}>
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-xl font-bold text-center">{title}</h2>
        </div>
        <div className="flex justify-center mb-4">
          {getIcon()}
        </div>
        <p className="mb-4 text-center">{message}</p>
        {type === 'error' && (
          <div className="flex items-center justify-center"><button className="px-4 py-2 text-black border-2 border-black rounded-lg focus:opacity-80 active:opacity-95" onClick={onClose}>OK</button></div>
        )}
        {type === 'warning' && (
          <div className="flex items-center justify-between space-x-2">
            <button className="px-4 py-2 text-black bg-gray-500 border-2 border-black rounded focus:opacity-80 active:opacity-95" onClick={onClose}>Cancel</button>
            <div>{children}</div>
          </div>
        )}
        {type === 'success' && (
          <div className="flex items-center justify-center">{children}</div>
        )}
      </div>
    </div>
  );
};

export default Popup;
