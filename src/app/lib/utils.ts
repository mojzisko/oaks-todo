import React from "react";

export const handleRemoveTaskField = (
  tasks: string[],
  setTasks: React.Dispatch<React.SetStateAction<string[]>>,
  index: number
): void => {
  if (tasks.length > 1) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }
};

export const handleAddTask = (
  setTasks: React.Dispatch<React.SetStateAction<string[]>>
): void => {
  // Add a new task to the current list of tasks.
  setTasks((prev) => [...prev, ""]);
};

export const handleTaskChange = (
  tasks: string[],
  setTasks: React.Dispatch<React.SetStateAction<string[]>>,
  index: number,
  value: string
): void => {
  // Create a copy of the tasks array avoid directly mutating the state.
  const newTasks = [...tasks];

  // Change the value of the task at the index.
  newTasks[index] = value;

  // Update the state with the new array of tasks.
  setTasks(newTasks);
};
