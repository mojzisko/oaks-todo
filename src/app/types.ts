export interface TaskData {
  text: string;
  completed: boolean;
}

export interface SectionData {
  name: string;
  completed: boolean;
  tasks: TaskData[];
}

export interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSection: (sectionName: string, tasks: string[]) => void;
}

export interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (sectionIndex: number, tasks: string[]) => void;
  sections: SectionData[];
}

export interface TaskProps {
  data: {
    text: string;
    completed: boolean;
  };
  onComplete: () => void;
  isDisabled: boolean;
}

export interface SectionProps {
  data: SectionData;
  isLocked: boolean;
  onTaskComplete: (taskIndex: number) => void;
}

export interface RandomFactModalProps {
  isOpen: boolean;
  onClose: () => void;
}
