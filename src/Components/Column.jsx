import React from 'react';
import TaskCard from './TaskCard';

export const getColumnColor = (column) => {
  switch (column) {
    case 'Todo': return 'bg-todo/40 border-todo';
    case 'Doing': return 'bg-doing/40 border-doing';
    case 'Done': return 'bg-done/40 border-done';
    default: return 'bg-gray-50 border-gray-200';
  }
};

export const getColumnHeaderColor = (column) => {
  switch (column) {
    case 'Todo': return 'bg-todo';
    case 'Doing': return 'bg-doing';
    case 'Done': return 'bg-done';
    default: return 'bg-gray-500';
  }
};

function Column({
  column,
  tasks,
  draggedTask,
  dragOverColumn,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
  onDragEnd,
  onEditTask,
  onDeleteTask,
  onAddTask
}) {
  return (
    <div
      className={`rounded-xl border-2 ${getColumnColor(column)} ${
        dragOverColumn === column ? 'ring-2 ring-primary ring-offset-2' : ''
      } transition-all`}
      onDragOver={(e) => onDragOver(e, column)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, column)}
    >
      {/* column header  */}
      <div className={`${getColumnHeaderColor(column)} text-text-secondary px-4 py-3 rounded-t-lg flex items-center justify-between`}>
        <h2 className="font-semibold text-lg">{column}</h2>
        <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
          {tasks.length}
        </span>
      </div>

      {/* Tasks Container */}
      <div className="p-3 min-h-75 space-y-3">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            column={column}
            draggedTask={draggedTask}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <p className="text-sm">No tasks</p>
            <button
              onClick={() => onAddTask(column)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              + Add a task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Column;
