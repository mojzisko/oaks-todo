"use client"
import React, { useState } from 'react';
import { AddTaskModalProps} from '../types'
import { handleRemoveTaskField, handleAddTask, handleTaskChange } from '../lib/utils';

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask, sections }) => {
  const [selectedSection, setSelectedSection] = useState<string>('0');
  const [tasks, setTasks] = useState<string[]>(['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(Number(selectedSection), tasks);
    setTasks(['']); 
    onClose();
  };

  const handleClose = () => {
    setTasks(['']); 
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-500 text-black bg-opacity-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-lg w-96">
        <label htmlFor="sectionSelect" className="block text-sm font-medium text-gray-700">Select Section:</label>
        <select 
          id="sectionSelect" 
          value={selectedSection} 
          onChange={(e) => setSelectedSection(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {sections.map((section, index) => (
            <option key={index} value={index}>
              {section.name}
            </option>
          ))}
        </select>

        {tasks.map((task, index) => (
          <div key={index} className="mt-4">
            <label htmlFor={`task${index}`} className="block text-sm font-medium text-gray-700">Task {index + 1}:</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                id={`task${index}`}
                value={task}
                onChange={(e) => handleTaskChange(tasks, setTasks, index, e.target.value)}
                placeholder={`Enter task ${index + 1} text...`}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              />
              {tasks.length > 1 && (
                <button type="button" onClick={() => handleRemoveTaskField(tasks, setTasks, index)} className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded-md text-white">
                  X
                </button>
              )}
            </div>
          </div>
        ))}

        <button type="button" onClick={() => handleAddTask(setTasks)} className="mt-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md text-black">
          Add Another Task
        </button>

        <div className="mt-4 flex justify-end space-x-3">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white">
            Add Tasks
          </button>
          <button type="button" onClick={handleClose} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskModal;
