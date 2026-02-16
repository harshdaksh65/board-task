import React, { useState } from 'react'
import { Plus, Search, Filter, ChevronDown, RotateCcw } from 'lucide-react'
import { toast } from 'react-toastify'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useTodo, COLUMNS, PRIORITIES } from '../context/TodoContext'
import { useDragAndDrop } from './DragAndDrop'
import Column from './Column'
import TaskFormModal from './Modals/TaskFormModal'
import ConfirmModal from './Modals/ConfirmModal'

function ToDo() {
  const { 
    addTask, 
    updateTask, 
    deleteTask, 
    resetBoard,
    getFilteredAndSortedTasks 
  } = useTodo()
  
  const {
    draggedTask,
    dragOverColumn,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd
  } = useDragAndDrop()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    tags: ''
  })

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
      tags: ''
    })
    setEditingTask(null)
    setFormErrors({})
  }

  const openCreateModal = (column = 'Todo') => {
    resetForm()
    setFormData(prev => ({ ...prev, column }))
    setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      dueDate: task.dueDate || '',
      tags: task.tags?.join(', ') || ''
    })
    setIsModalOpen(true)
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required'
    } else if (formData.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters'
    }
    
    setFormErrors(errors)
    
    // Show toast for the first error found
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]
      toast.error(firstError)
      return false
    }
    
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag)

    if (editingTask) {
      updateTask(editingTask.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        dueDate: formData.dueDate,
        tags: tagsArray
      })
      toast.success('Task updated successfully!')
    } else {
      addTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        dueDate: formData.dueDate,
        tags: tagsArray,
        column: formData.column || 'Todo'
      })
      toast.success('Task created successfully!')
    }

    setIsModalOpen(false)
    resetForm()
  }

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId)
    toast.success('Task deleted successfully!')
  }

  const getFilteredTasks = (column) => {
    return getFilteredAndSortedTasks(column, searchQuery, priorityFilter)
  }

  return (
    <div className="min-h-screen w-screen bg-background pt-24 px-4 pb-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-harsh md:border-neutral-200 p-6 md:p-10 mt-5">
        
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            
            <div className="relative ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-neutral-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-64"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 pl-3 pr-3 py-2 border border-neutral-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
                <Filter className="text-gray-400 w-4 h-4" />
                <span className="text-sm">{priorityFilter || 'All Priorities'}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="border-neutral-200  bg-white">
                <DropdownMenuItem onClick={() => setPriorityFilter('')}>
                  All Priorities
                </DropdownMenuItem>
                {PRIORITIES.map(priority => (
                  <DropdownMenuItem key={priority} onClick={() => setPriorityFilter(priority)}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      priority === 'High' ? 'bg-red-500' :
                      priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    {priority}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={() => openCreateModal()}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {COLUMNS.map(column => (
            <Column
              key={column}
              column={column}
              tasks={getFilteredTasks(column)}
              draggedTask={draggedTask}
              dragOverColumn={dragOverColumn}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onEditTask={openEditModal}
              onDeleteTask={handleDeleteTask}
              onAddTask={openCreateModal}
            />
          ))}
        </div>
      </div>

      {/* Task Form Modal */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          resetForm()
        }}
        formData={formData}
        setFormData={(data) => {
          if (typeof data === 'function') {
            setFormData(data)
          } else {
            setFormData(data)
          }
          if (formErrors.title) setFormErrors({ ...formErrors, title: '' })
        }}
        formErrors={formErrors}
        onSubmit={handleSubmit}
        isEditing={!!editingTask}
      />

      {/* Reset Board Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={() => {
          resetBoard()
          setShowResetConfirm(false)
          toast.success('Board has been reset successfully!')
        }}
        title="Reset Board?"
        description="This will permanently delete all tasks from all columns. This action cannot be undone."
        confirmText="Reset Board"
        cancelText="Cancel"
        variant="danger"
        icon={RotateCcw}
      />
    </div>
  )
}

export default ToDo