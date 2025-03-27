import { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { tasks, loading, addTask, updateTask, deleteTask } = useContext(TaskContext);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleAddTask = async (taskData) => {
    const result = await addTask(taskData);
    if (result.success) {
      setMessage('Task added successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.message);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    const result = await updateTask(id, taskData);
    if (!result.success) {
      setMessage(result.message);
    }
  };

  const handleDeleteTask = async (id) => {
    const result = await deleteTask(id);
    if (result.success) {
      setMessage('Task deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.message);
    }
  };

  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !task.completed) || 
      (filter === 'completed' && task.completed);
    
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Your Tasks</h1>
      </div>
      
      {message && <div className="message">{message}</div>}
      
      <div className="task-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      
      <div className="task-form-container">
        <TaskForm onSubmit={handleAddTask} />
      </div>
      
      <div className="task-list">
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))
        ) : (
          <div className="no-tasks">
            {searchTerm || filter !== 'all' 
              ? 'No tasks match your search or filter.' 
              : 'No tasks yet. Add one above!'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 