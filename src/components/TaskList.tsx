import { ClipboardList } from 'lucide-react';
import type { Task } from '../hooks/useTasks';
import { TaskItem } from './TaskItem';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <ClipboardList size={48} className="empty-icon" />
        <p>No tasks yet!</p>
        <span>Add a task above to get started.</span>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
