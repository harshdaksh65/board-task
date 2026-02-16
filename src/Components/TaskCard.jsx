import React from 'react';
import { Edit2, Trash2, Calendar, Tag, GripVertical } from 'lucide-react';

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High': return 'bg-red-100 text-red-700 border-red-200';
    case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Low': return 'bg-green-100 text-green-700 border-green-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date(new Date().setHours(0, 0, 0, 0));
};

function TaskCard({ 
  task, 
  column,
  draggedTask,
  onDragStart, 
  onDragEnd, 
  onEdit, 
  onDelete 
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      className={`bg-white rounded-lg border border-gray-200 p-3 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${
        draggedTask?.id === task.id ? 'opacity-50 scale-95' : ''
      }`}
    >
      {/* Task Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 flex-1">
          <GripVertical className="w-4 h-4 text-gray-300 mt-1 shrink-0" />
          <h3 className="font-medium text-gray-800 wrap-break-word">{task.title}</h3>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-gray-400 hover:text-primary transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-500 mb-2 line-clamp-2 ml-6">
          {task.description}
        </p>
      )}

      {/* Task Meta */}
      <div className="flex flex-wrap items-center gap-2 ml-6">
        {/* Priority Badge */}
        <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>

        {/* Due Date */}
        {task.dueDate && (
          <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
            isOverdue(task.dueDate) && column !== 'Done'
              ? 'bg-red-100 text-red-600'
              : 'bg-gray-100 text-gray-600'
          }`}>
            <Calendar className="w-3 h-3" />
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2 ml-6">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Created At */}
      <div className="text-xs text-gray-400 mt-2 ml-6">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}

export default TaskCard;
