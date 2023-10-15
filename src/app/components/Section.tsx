"use client"
import React from 'react';
import Task from './Task';
import { SectionProps} from '../types'

const Section: React.FC<SectionProps> = ({ data, isLocked, onTaskComplete }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-6 w-96">
      <h2 className={`text-lg font-semibold ${data.completed ? 'text-green-600' : 'text-blue-600'}`}>
        {data.name} {data.completed && "(Completed)"}
      </h2>
      {data.tasks.map((task, tIndex) => (
        <Task
          key={tIndex}
          data={task}
          onComplete={() => onTaskComplete(tIndex)}
          isDisabled={isLocked}
        />
      ))}
    </div>
  );
};

export default Section;
