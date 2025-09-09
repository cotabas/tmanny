import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      {isLogin ? (
        <Login switchToRegister={() => setIsLogin(false)} />
      ) : (
        <Register switchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Task Manager</h1>
        <div className="user-info">
          <span>Welcome, {user.email}!</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>
      <main>
        <p>Dashboard coming soon...</p>
      </main>
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return user ? <Dashboard /> : <AuthPage />;
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
