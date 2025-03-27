import { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    onSubmit({ title, description });
    
    if (!task) {
      // Clear form if adding a new task
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>{task ? 'Edit Task' : 'Add New Task'}</h3>
      
      {error && <div className="error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows="3"
        />
      </div>
      
      <div className="form-actions">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
        <button type="submit" className="btn-primary">
          {task ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm; 