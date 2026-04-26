export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type Action =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string };

const tasksReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        { id: crypto.randomUUID(), text: action.payload, completed: false },
        ...state,
      ];
    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

import { useReducer, useEffect } from 'react';

export function useTasks() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    [],
    (initialValue) => {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : initialValue;
    }
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => dispatch({ type: 'ADD_TASK', payload: text });
  const toggleTask = (id: string) => dispatch({ type: 'TOGGLE_TASK', payload: id });
  const deleteTask = (id: string) => dispatch({ type: 'DELETE_TASK', payload: id });

  return { tasks, addTask, toggleTask, deleteTask };
}
