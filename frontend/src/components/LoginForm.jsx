import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

export default function LoginForm({ onLogin }) {
  const [tab, setTab] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const body = {};
      if (username) body.username = username;
      if (email) body.email = email;
      body.password = password;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAdmin', data.isAdmin);
        // Save username/email for user dropdown
        if (data.username) localStorage.setItem('username', data.username);
        else if (username) localStorage.setItem('username', username);
        else localStorage.removeItem('username');
        if (data.email) localStorage.setItem('email', data.email);
        else if (email) localStorage.setItem('email', email);
        else localStorage.removeItem('email');
        onLogin(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, isAdmin }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Registration successful! Please login.');
        setTab('login');
        setUsername(''); setEmail(''); setPassword(''); setIsAdmin(false);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const switchTab = (newTab) => {
    setTab(newTab);
    setError('');
    setSuccess('');
    setPassword('');
    if (newTab === 'login') setEmail('');
    if (newTab === 'register') setUsername('');
  };

  return (
    <div style={{ minWidth: 320, maxWidth: 400 }}>
      <div style={{
        width: '100%',
        height: 7,
        background: 'var(--header-gradient)',
        borderRadius: '10px 10px 0 0',
        marginBottom: 18
      }} />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
        <FaUserCircle size={44} color="var(--btn-border)" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18, gap: 8 }}>
        <button onClick={() => switchTab('login')} style={{ fontWeight: tab === 'login' ? 'bold' : 'normal', background: 'none', border: 'none', color: tab === 'login' ? 'var(--btn-border)' : 'var(--text-secondary)', fontSize: 18, cursor: 'pointer', padding: 0 }}>Login</button>
        <span style={{ color: 'var(--text-secondary)' }}>|</span>
        <button onClick={() => switchTab('register')} style={{ fontWeight: tab === 'register' ? 'bold' : 'normal', background: 'none', border: 'none', color: tab === 'register' ? 'var(--btn-border)' : 'var(--text-secondary)', fontSize: 18, cursor: 'pointer', padding: 0 }}>Register</button>
      </div>
      {tab === 'login' ? (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h2 style={{ textAlign: 'center', color: 'var(--btn-border)', margin: 0, fontWeight: 700, fontSize: 26 }}>Login</h2>
          <input
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ marginBottom: 4 }}
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ marginBottom: 4 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ marginBottom: 4 }}
          />
          <button type="submit" style={{ background: 'var(--btn-gradient)', color: 'var(--btn-text)', border: 'none', borderRadius: 8, padding: '10px 0', fontWeight: 600, fontSize: 17, marginTop: 8 }}>Login</button>
        </form>
      ) : (
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h2 style={{ textAlign: 'center', color: 'var(--btn-border)', margin: 0, fontWeight: 700, fontSize: 26 }}>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ marginBottom: 4 }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ marginBottom: 4 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ marginBottom: 4 }}
          />
          <label style={{ display: 'block', marginBottom: 4, color: 'var(--text-secondary)', fontSize: 15 }}>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={e => setIsAdmin(e.target.checked)}
              style={{ marginRight: 6 }}
            />{' '}
            Register as Admin
          </label>
          <button type="submit" style={{ background: 'var(--btn-gradient)', color: 'var(--btn-text)', border: 'none', borderRadius: 8, padding: '10px 0', fontWeight: 600, fontSize: 17, marginTop: 8 }}>Register</button>
        </form>
      )}
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
    </div>
  );
} 