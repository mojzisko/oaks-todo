"use client"
import React, { useState } from 'react';
import { AddSectionModalProps} from '../types'

const AddSectionModal: React.FC<AddSectionModalProps> = ({ isOpen, onClose, onAddSection }) => {
  const [sectionName, setSectionName] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>(['']);

  const handleAddTask = () => {
    setTasks(prev => [...prev, '']);
  };

  const handleRemoveTask = (index: number) => {
    if (tasks.length > 1) {
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
    }
  };

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSection(sectionName, tasks);
    setSectionName('');
    setTasks(['']);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded-md shadow-lg w-96">
        
        <div className="mb-4">
          <label htmlFor="sectionName" className="block text-sm font-medium text-gray-700">Section Name:</label>
          <input 
            type="text" 
            id="sectionName" 
            placeholder="Type section name here..."
            value={sectionName} 
            onChange={(e) => setSectionName(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
          />
        </div>
  
        <label className="block text-sm mb-2 font-medium text-gray-700">Tasks:</label>
        {tasks.map((task, index) => (
          <div key={index} className="mb-4 flex items-center space-x-2">
            <input 
              type="text" 
              value={task} 
              placeholder="Type task name here..."
              onChange={(e) => handleTaskChange(index, e.target.value)}
              className="flex-grow py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
            />
           {tasks.length > 1 && (
              <button 
                type="button" 
                onClick={() => handleRemoveTask(index)} 
                className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded-md text-white"
              >
                X
              </button>
            )}
          </div>
        ))}
  
        <button type="button" onClick={handleAddTask} className="mb-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md text-black">
          Add Another Task
        </button>
  
        <div className="mt-4 flex justify-end space-x-3">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white">
            Add Section
          </button>
          <button type="button" onClick={onClose} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSectionModal;
