import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { LayoutGrid, Bell, Home, Calendar, MessageSquare, User, Plus } from 'lucide-react';
import './App.css';

function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [isInputOpen, setIsInputOpen] = useState(false);

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <button className="icon-btn">
          <LayoutGrid size={20} />
        </button>
        <h1>Homepage</h1>
        <button className="icon-btn">
          <Bell size={20} />
        </button>
      </header>

      {/* Progress Card */}
      <div className="progress-card-container">
        <div className="progress-card">
          <h2 className="progress-title">Today's progress summery</h2>
          <p className="progress-subtitle">{tasks.length} Tasks</p>
          
          <div className="progress-bottom">
            <div className="mock-avatars">
              <div className="mock-avatar" style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=11)', backgroundSize: 'cover' }} />
              <div className="mock-avatar" style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=32)', backgroundSize: 'cover' }} />
              <div className="mock-avatar">+</div>
            </div>
            
            <div className="progress-bar-container">
              <div className="progress-text">
                <span>Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Section */}
      <main className="main-content">
        <div className="section-header">
          <h2>Today's Task</h2>
          <button className="see-all-btn">See All</button>
        </div>
        
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </main>

      {/* Floating Input Modal Overlay */}
      {isInputOpen && (
        <TaskInput 
          onAdd={(text) => {
            addTask(text);
            setIsInputOpen(false);
          }} 
          onClose={() => setIsInputOpen(false)} 
        />
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-item active">
          <Home size={24} />
        </button>
        <button className="nav-item">
          <Calendar size={24} />
        </button>
        
        <div className="fab-container">
          <button className="fab" onClick={() => setIsInputOpen(true)}>
            <Plus size={28} />
          </button>
        </div>
        
        <button className="nav-item">
          <MessageSquare size={24} />
        </button>
        <button className="nav-item">
          <User size={24} />
        </button>
      </nav>
    </div>
  );
}

export default App;