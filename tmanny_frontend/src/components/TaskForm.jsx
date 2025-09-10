import { useState } from 'react';
import { tasksAPI } from '../services/api';

const TaskForm = ({ onTaskCreate, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await tasksAPI.createTask({
        title: title.trim(),
        description: description.trim()
      });
      
      onTaskCreate(response.data);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <article>
      <header>
        <h3>Create New Task</h3>
      </header>
      
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: 'var(--pico-color-red-500)', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        
        <fieldset>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)..."
              rows="3"
            />
          </label>
        </fieldset>

        <div className="grid">
          <button type="submit" aria-busy={loading}>
            {loading ? 'Creating...' : 'Create Task'}
          </button>
          <button type="button" onClick={onCancel} className="secondary">
            Cancel
          </button>
        </div>
      </form>
    </article>
  );
};

export default TaskForm;
