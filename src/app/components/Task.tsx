"use client"
import React from 'react';
import { TaskProps} from '../types'

const Task: React.FC<TaskProps> = ({ data, onComplete, isDisabled }) => {
  return (
    <div className="flex items-center space-x-4 p-2 w-full bg-white rounded shadow">
      <input
        type="checkbox"
        checked={data.completed}
        onChange={onComplete}
        disabled={isDisabled}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <span className={`flex-1 ${data.completed ? 'line-through text-gray-500' : 'text-black'} overflow-hidden overflow-ellipsis`}>
        {data.text}
      </span>
    </div>
  );
};

export default Task;
