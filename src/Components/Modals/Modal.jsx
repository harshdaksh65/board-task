import React from 'react';
import { X } from 'lucide-react';

function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 'max-w-md',
  showCloseButton = true 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}>
        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            {title && (
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors ml-auto"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        )}

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
