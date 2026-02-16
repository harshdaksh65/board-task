import React from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger', // 'danger' | 'warning' | 'info'
  icon: Icon = AlertTriangle,
}) {
  const variantStyles = {
    danger: {
      icon: 'bg-red-100 text-red-600',
      button: 'bg-red-600 hover:bg-red-700 text-white',
    },
    warning: {
      icon: 'bg-yellow-100 text-yellow-600',
      button: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    },
    info: {
      icon: 'bg-blue-100 text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
  };

  const styles = variantStyles[variant] || variantStyles.info;

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <div className="p-6 text-center">
        {/* Icon */}
        <div className={`mx-auto w-12 h-12 rounded-full ${styles.icon} flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

        {/* Description */}
        <p className="text-gray-600 mb-6">{description}</p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${styles.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
