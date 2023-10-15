"use client"
import React, { useState, useEffect } from 'react';
import Section from './components/Section';
import AddTaskModal from './components/AddTaskModal';
import AddSectionModal from './components/AddSectionModal';
import RandomFactModal from './components/RandomFactModal';
import { SectionData} from './types'

const App: React.FC = () => {
  const initialSections: SectionData[] = [
    {
      name: 'Office stuff',
      completed: false,
      tasks: [
        { text: 'Find office', completed: false },
      ],
    },
  ]; 

  const [sections, setSections] = useState<SectionData[]>(() => {
    const savedSections = localStorage.getItem('sections');
    return savedSections ? JSON.parse(savedSections) : initialSections;
  });
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState<boolean>(false);
  const [isFactModalOpen, setIsFactModalOpen] = useState<boolean>(false);

  // Save sections to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('sections', JSON.stringify(sections));
  }, [sections]);

  const areAllSectionsCompleted = sections.every(section => 
    section.completed && section.tasks.every(task => task.completed)
  );
  
  useEffect(() => {
    if (areAllSectionsCompleted) {
      setIsFactModalOpen(true);
    }
  }, [sections]);

  const handleTaskComplete = (sectionIndex: number, taskIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].tasks[taskIndex].completed = !newSections[sectionIndex].tasks[taskIndex].completed;

    // Check all tasks in the section to check the sections completion status
    newSections[sectionIndex].completed = newSections[sectionIndex].tasks.every(task => task.completed);
    setSections(newSections);
  };

  const handleAddTask = (sectionIndex: number, newTasks: string[]) => {
    const newSections = [...sections];
    newTasks.forEach(taskText => {
      newSections[sectionIndex].tasks.push({ text: taskText, completed: false });
    });
    // Ensure the section is marked as not completed when a new task is added after section completion
    newSections[sectionIndex].completed = false;
    setSections(newSections);
  };

  const handleAddSection = (sectionName: string, tasks: string[]) => {
    const newSection: SectionData = {
      name: sectionName,
      completed: false,
      tasks: tasks.map(task => ({ text: task, completed: false })),
    };
    setSections(prev => [...prev, newSection]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {sections.map((sectionData, sIndex) => (
        <Section
          key={sIndex}
          data={sectionData}
          isLocked={sIndex > 0 && !sections[sIndex - 1].completed}
          onTaskComplete={(tIndex) => handleTaskComplete(sIndex, tIndex)}
        />
      ))}

      <div className="mt-4 flex space-x-4">
        <button 
          onClick={() => setIsAddTaskModalOpen(true)} 
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
        >
          Add Task
        </button>
        <button 
          onClick={() => setIsAddSectionModalOpen(true)} 
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white"
        >
          Add Section
        </button>
      </div>
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={handleAddTask}
        sections={sections}
      />
      <AddSectionModal
        isOpen={isAddSectionModalOpen}
        onClose={() => setIsAddSectionModalOpen(false)}
        onAddSection={handleAddSection}
      />
      <RandomFactModal
        isOpen={isFactModalOpen}
        onClose={() => setIsFactModalOpen(false)}
      />
    </div>
  );
};

export default App;
