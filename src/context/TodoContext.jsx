import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext(null);

const COLUMNS = ['Todo', 'Doing', 'Done'];
const PRIORITIES = ['Low', 'Medium', 'High'];

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('taskboard-tasks');
      if (!saved) return [];
      
      const parsed = JSON.parse(saved);
      
      // Ensure it's an array
      if (!Array.isArray(parsed)) {
        console.warn('Invalid tasks format in localStorage, resetting to empty array');
        return [];
      }
      
      return parsed;
    } catch (error) {
      console.error('Failed to parse tasks from localStorage:', error);
      return [];
    }
  });

  // Activity Log state
  const [activityLog, setActivityLog] = useState(() => {
    try {
      const saved = localStorage.getItem('taskboard-activity');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Save activity log to localStorage
  useEffect(() => {
    localStorage.setItem('taskboard-activity', JSON.stringify(activityLog));
  }, [activityLog]);

  // Add activity log entry
  const addActivity = (action, taskTitle, details = '') => {
    const entry = {
      id: generateId(),
      action,
      taskTitle,
      details,
      timestamp: new Date().toISOString()
    };
    setActivityLog(prev => [entry, ...prev].slice(0, 50)); // Keep last 50 entries
  };

  // Clear activity log
  const clearActivityLog = () => {
    setActivityLog([]);
    localStorage.removeItem('taskboard-activity');
  };

  useEffect(() => {
    localStorage.setItem('taskboard-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: generateId(),
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      priority: taskData.priority || 'Medium',
      dueDate: taskData.dueDate || '',
      tags: taskData.tags || [],
      column: taskData.column || 'Todo',
      createdAt: new Date().toISOString()
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    addActivity('created', newTask.title, `Added to ${newTask.column}`);
    return newTask;
  };

  const updateTask = (taskId, updates) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      addActivity('edited', task.title);
    }
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === taskId
          ? { ...t, ...updates }
          : t
      )
    );
  };

  const deleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      addActivity('deleted', task.title);
    }
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
  };

  const moveTask = (taskId, newColumn) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.column !== newColumn) {
      addActivity('moved', task.title, `${task.column} → ${newColumn}`);
    }
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === taskId
          ? { ...t, column: newColumn }
          : t
      )
    );
  };

  const getTasksByColumn = (column) => {
    return tasks.filter(task => task.column === column);
  };

  const resetBoard = () => {
    addActivity('reset', 'All tasks', 'Board was reset');
    setTasks([]);
    localStorage.removeItem('taskboard-tasks');
  };

  const getFilteredAndSortedTasks = (column, searchQuery = '', priorityFilter = '') => {
    return tasks
      .filter(task => task.column === column)
      .filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(task =>
        !priorityFilter || task.priority === priorityFilter
      )
      .sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
  };

  const value = {
    tasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByColumn,
    getFilteredAndSortedTasks,
    resetBoard,
    activityLog,
    clearActivityLog,
    COLUMNS,
    PRIORITIES
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export { COLUMNS, PRIORITIES };
