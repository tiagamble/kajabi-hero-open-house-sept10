import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('hero-auth-sept10');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
    } else if (router.pathname !== '/_app') {
      setShowPassword(true);
    }
  }, [router]);

  const handlePassword = (e) => {
    e.preventDefault();
    if (password === 'Intheroom') {
      localStorage.setItem('hero-auth-sept10', 'authenticated');
      setIsAuthenticated(true);
      setShowPassword(false);
      setError('');
    } else {
      setError('Incorrect password. Try again.');
      setPassword('');
    }
  };

  if (showPassword && !isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
        }}>
          <h1 style={{ marginBottom: '10px', fontSize: '24px', fontWeight: 'bold' }}>
            Hero Open House
          </h1>
          <p style={{ marginBottom: '20px', fontSize: '12px', color: '#666' }}>
            September 10, 2026
          </p>
          <form onSubmit={handlePassword}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              autoFocus
            />
            {error && <p style={{ color: 'red', marginBottom: '10px', fontSize: '12px' }}>{error}</p>}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#3a6278',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;
