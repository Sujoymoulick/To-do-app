import { ChevronRight, CheckCircle2, Trash2 } from 'lucide-react';
import type { Task } from '../hooks/useTasks';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  // Generate a consistent random color based on task ID for the icon background
  const colors = [
    { bg: '#E0F2FE', text: '#0284C7' },
    { bg: '#FFEDD5', text: '#EA580C' },
    { bg: '#DCFCE7', text: '#16A34A' },
    { bg: '#F3E8FF', text: '#9333EA' }
  ];
  const colorIdx = task.id.charCodeAt(0) % colors.length;
  const color = colors[colorIdx];

  // Derive a fake time based on creation length just for the mockup look
  const timeMock = "09:00 AM - 11:00 AM";

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <button className="task-card-content" onClick={() => onToggle(task.id)}>
        <div className="task-icon" style={{ backgroundColor: color.bg, color: color.text }}>
          {/* Using first letter as a placeholder for the colorful icons in the mockup */}
          {task.text.charAt(0).toUpperCase()}
        </div>
        
        <div className="task-details">
          <span className="task-title">{task.text}</span>
          <span className="task-time">{timeMock}</span>
        </div>
        
        <div className="task-actions">
          {task.completed ? (
            <CheckCircle2 className="check-icon" size={20} />
          ) : (
            <ChevronRight className="chevron-icon" size={20} />
          )}
        </div>
      </button>

      <button className="task-delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>
        <Trash2 size={18} />
      </button>
    </div>
  );
}
