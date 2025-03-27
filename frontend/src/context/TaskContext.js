import { createContext, useState, useContext, useEffect } from 'react';
import api from '../config/axios';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      const response = await api.get('/api/tasks', config);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      const response = await api.post('/api/tasks', taskData, config);
      setTasks([...tasks, response.data]);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add task'
      };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      const response = await api.put(`/api/tasks/${id}`, taskData, config);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update task'
      };
    }
  };

  const deleteTask = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      await api.delete(`/api/tasks/${id}`, config);
      setTasks(tasks.filter(task => task._id !== id));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to delete task'
      };
    }
  };

  return (
    <TaskContext.Provider 
      value={{ tasks, loading, fetchTasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}; 