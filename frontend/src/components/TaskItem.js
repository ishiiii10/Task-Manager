import { useState } from 'react';
import TaskForm from './TaskForm';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedTask) => {
    onUpdate(task._id, { ...updatedTask, completed: task.completed });
    setIsEditing(false);
  };

  const toggleComplete = () => {
    onUpdate(task._id, { completed: !task.completed });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <TaskForm 
          task={task} 
          onSubmit={handleUpdate} 
          onCancel={() => setIsEditing(false)} 
        />
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-title-container">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleComplete}
            className="task-checkbox"
          />
          <h3 className="task-title">{task.title}</h3>
        </div>
        <div className="task-actions">
          <button 
            onClick={() => setIsEditing(true)} 
            className="btn-edit"
            aria-label="Edit task"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(task._id)} 
            className="btn-delete"
            aria-label="Delete task"
          >
            Delete
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-meta">
        <span className="task-date">Created: {formatDate(task.createdAt)}</span>
        <span className="task-status">
          Status: {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>
    </div>
  );
};

export default TaskItem; 