import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './TaskInput.css';

interface TaskInputProps {
  onAdd: (text: string) => void;
  onClose?: () => void;
}

export function TaskInput({ onAdd, onClose }: TaskInputProps) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <div className="task-input-overlay" onClick={onClose}>
      <div className="task-input-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create New Task</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="task-input-form">
          <input
            ref={inputRef}
            type="text"
            className="task-input"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="task-submit-btn" disabled={!text.trim()}>
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
