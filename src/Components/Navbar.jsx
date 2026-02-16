import React, { useState, useRef, useEffect } from 'react'
import { LogOut, Bell, Plus, Pencil, ArrowRight, Trash2, RotateCcw, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTodo } from '../context/TodoContext';

// Helper to format relative time
const formatRelativeTime = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

// Get icon for activity type
const getActivityIcon = (action) => {
  switch (action) {
    case 'created': return <Plus className="w-4 h-4 text-green-600" />;
    case 'edited': return <Pencil className="w-4 h-4 text-blue-600" />;
    case 'moved': return <ArrowRight className="w-4 h-4 text-yellow-600" />;
    case 'deleted': return <Trash2 className="w-4 h-4 text-red-600" />;
    case 'reset': return <RotateCcw className="w-4 h-4 text-red-600" />;
    default: return <Bell className="w-4 h-4 text-gray-600" />;
  }
};

// Get action label
const getActionLabel = (action) => {
  switch (action) {
    case 'created': return 'Created';
    case 'edited': return 'Edited';
    case 'moved': return 'Moved';
    case 'deleted': return 'Deleted';
    case 'reset': return 'Reset';
    default: return action;
  }
};

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { activityLog, clearActivityLog } = useTodo();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handlelogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-white text-text p-4 max-w-7xl mx-auto md:border md:border-neutral-200 md:rounded-full md:shadow-harsh md:mt-4 px-5 md:px-24 w-screen fixed top-0 left-0 right-0 z-50">
        <h1 className="text-xl font-bold">Task Board</h1>
        
        <div className="flex items-center gap-3">
          {/* Activity Log Bell */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {activityLog.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {activityLog.length > 9 ? '9+' : activityLog.length}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="fixed sm:absolute top-16 sm:top-auto right-2 sm:right-0 left-2 sm:left-auto mt-0 sm:mt-2 sm:w-80 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden z-50">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Activity Log</h3>
                  {activityLog.length > 0 && (
                    <button
                      onClick={clearActivityLog}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Clear all
                    </button>
                  )}
                </div>

                {/* Activity List */}
                <div className="max-h-80 overflow-y-auto">
                  {activityLog.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No activity yet</p>
                    </div>
                  ) : (
                    activityLog.map((entry) => (
                      <div
                        key={entry.id}
                        className="px-4 py-3 border-b border-neutral-100 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {getActivityIcon(entry.action)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800">
                              <span className="font-medium">{getActionLabel(entry.action)}</span>
                              {' '}
                              <span className="text-gray-600 truncate">"{entry.taskTitle}"</span>
                            </p>
                            {entry.details && (
                              <p className="text-xs text-gray-500 mt-0.5">{entry.details}</p>
                            )}
                            <p className="text-xs text-gray-400 mt-1">
                              {formatRelativeTime(entry.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <div onClick={handlelogout} className="flex justify-between items-center gap-2 bg-primary text-white px-4 py-2 rounded-2xl hover:bg-text-secondary cursor-pointer">
            <LogOut className="w-4 h-4" />
            <button>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar