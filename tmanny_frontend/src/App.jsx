import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import './App.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="container">
      <section className="auth-section">
        {isLogin ? (
          <Login switchToRegister={() => setIsLogin(false)} />
        ) : (
          <Register switchToLogin={() => setIsLogin(true)} />
        )}
      </section>
    </main>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <nav className="container-fluid">
        <ul>
          <li><h1>Task Manager</h1></li>
        </ul>
        <ul>
          <li>
            <button className="outline secondary" onClick={toggleTheme}>
              🌓 Theme
            </button>
          </li>
          <li>Welcome, {user.email}!</li>
          <li><button className="outline" onClick={logout}>Logout</button></li>
        </ul>
      </nav>
      <main className="container">
        <TaskList />
      </main>
    </>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="container">
        <article aria-busy="true"></article>
      </main>
    );
  }

  return user ? <Dashboard /> : <AuthPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
