import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = ({ switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <article>
      <header>
        <h2>Login</h2>
      </header>
      
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: 'var(--pico-color-red-500)', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        
        <fieldset>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </fieldset>

        <button type="submit" aria-busy={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <footer>
        <p>
          Don't have an account?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); switchToRegister(); }}>
            Sign up
          </a>
        </p>
      </footer>
    </article>
  );
};

export default Login;
