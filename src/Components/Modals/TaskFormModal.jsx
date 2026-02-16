import React from 'react';
import Modal from './Modal';
import { PRIORITIES } from '../../context/TodoContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High': return 'bg-red-500';
    case 'Medium': return 'bg-yellow-500';
    case 'Low': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

function TaskFormModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  formErrors,
  onSubmit,
  isEditing,
}) {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Task' : 'Create New Task'}
    >
      <form onSubmit={onSubmit} className="p-4 space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter task title"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              formErrors.title 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-neutral-200 focus:ring-primary/50'
            }`}
          />
          {formErrors.title && (
            <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Enter task description"
            rows={3}
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full flex items-center justify-between px-3 py-2 border border-neutral-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getPriorityColor(formData.priority)}`} />
                <span>{formData.priority}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-(--radix-dropdown-menu-trigger-width) border-neutral-200 p-0">
              {PRIORITIES.map((priority) => (
                <DropdownMenuItem
                  key={priority}
                  className="bg-white hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleChange('priority', priority)}
                >
                  <span className={`w-2 h-2 rounded-full mr-2 ${getPriorityColor(priority)}`} />
                  {priority}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
            placeholder="Enter tags (comma separated)"
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-neutral-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            {isEditing ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskFormModal;
