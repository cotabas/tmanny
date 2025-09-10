import { useState } from 'react';
import { tasksAPI } from '../services/api';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      const response = await tasksAPI.updateTask(task.id, {
        ...task,
        completed: !task.completed
      });
      onUpdate(response.data);
    } catch (err) {
      console.error('Failed to update task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setLoading(true);
    try {
      await tasksAPI.deleteTask(task.id);
      onDelete(task.id);
    } catch (err) {
      console.error('Failed to delete task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await tasksAPI.updateTask(task.id, {
        ...task,
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      onUpdate(response.data);
      setEditing(false);
    } catch (err) {
      console.error('Failed to update task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditing(false);
  };

  if (editing) {
    return (
      <article className="task-editing">
        <form onSubmit={handleEditSubmit}>
          <fieldset>
            <label>
              Title
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Description
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows="2"
              />
            </label>
          </fieldset>
          <div className="grid">
            <button type="submit" aria-busy={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={handleCancelEdit} className="secondary">
              Cancel
            </button>
          </div>
        </form>
      </article>
    );
  }

  return (
    <article className={`task-item ${task.completed ? 'completed' : ''}`}>
      <header>
        <div className="task-title">
          <h4 style={{ margin: 0 }}>{task.title}</h4>
          <div className="task-actions">
            <button
              onClick={handleToggleComplete}
              disabled={loading}
              className={task.completed ? 'outline' : 'contrast'}
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
            >
              {task.completed ? '✓ Done' : '○ Todo'}
            </button>
            <button
              onClick={() => setEditing(true)}
              disabled={loading}
              className="outline secondary"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="outline"
              style={{ 
                padding: '0.25rem 0.5rem', 
                fontSize: '0.875rem',
                color: 'var(--pico-color-red-500)',
                borderColor: 'var(--pico-color-red-500)'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </header>
      
      {task.description && (
        <p style={{ color: 'var(--pico-color-grey-600)', margin: '0.5rem 0' }}>
          {task.description}
        </p>
      )}
      
      <footer>
        <small style={{ color: 'var(--pico-color-grey-500)' }}>
          Created: {new Date(task.created_at).toLocaleDateString()}
        </small>
      </footer>
    </article>
  );
};

export default TaskItem;
