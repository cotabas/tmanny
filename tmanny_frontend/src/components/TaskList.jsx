import { useState, useEffect } from 'react';
import { tasksAPI } from '../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await tasksAPI.getTasks();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Fetch tasks error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreate = (newTask) => {
    setTasks([newTask, ...tasks]);
    setShowForm(false);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  if (loading) return <article aria-busy="true"></article>;
  
  if (error) return (
    <article>
      <div style={{ color: 'var(--pico-color-red-500)' }}>{error}</div>
    </article>
  );

  return (
    <section>
      <header className="task-header">
        <hgroup>
          <h2>Your Tasks</h2>
          <p>{tasks.length} task{tasks.length !== 1 ? 's' : ''}</p>
        </hgroup>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="contrast"
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </header>

    {showForm && (
      <div className="task-form-container">
        <TaskForm 
          onTaskCreate={handleTaskCreate}
          onCancel={() => setShowForm(false)}
        />
      </div>
    )}

      {tasks.length === 0 ? (
        <article>
          <p style={{ textAlign: 'center', color: 'var(--pico-color-grey-500)' }}>
            No tasks yet. Create your first task!
          </p>
        </article>
      ) : (
        <div className="tasks-grid">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TaskList;
