import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import CarList from './components/CarList';
import AddCarForm from './components/AddCarForm';
import Footer from './components/Footer';
import CarDetails from './components/CarDetails';
import './App.css';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') || 'light';
  }
  return 'light';
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const [refresh, setRefresh] = useState(0);
  const [theme, setTheme] = useState(getInitialTheme());
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef();

  const [userInfo, setUserInfo] = useState({
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || ''
  });

  useEffect(() => {
    setToken(localStorage.getItem('token') || '');
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    setUserInfo({
      username: localStorage.getItem('username') || '',
      email: localStorage.getItem('email') || ''
    });
  }, []);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!showUserMenu) return;
    function handleClick(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showUserMenu]);

  const handleLogin = (tok) => {
    setToken(tok);
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    setShowLogin(false);
    // Fetch user info from token or backend if needed
    // For now, assume LoginForm stores username/email in localStorage
    setUserInfo({
      username: localStorage.getItem('username') || '',
      email: localStorage.getItem('email') || ''
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setToken('');
    setIsAdmin(false);
    setUserInfo({ username: '', email: '' });
    setShowUserMenu(false);
  };

  const handleAdd = () => {
    setRefresh(r => r + 1);
  };

  const handleThemeToggle = () => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  };

  const handleUserIconClick = () => {
    if (!token) setShowLogin(true);
    else setShowUserMenu(v => !v);
  };

  return (
    <Router>
      <div className="App">
        <Header theme={theme} onThemeToggle={handleThemeToggle} onUserIconClick={handleUserIconClick} />
        {/* Only show Welcome if not logged in */}
        {!token && <Welcome />}
        {/* Login/Register Modal */}
        {showLogin && !token && (
          <div className="modal-overlay" onClick={() => setShowLogin(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <LoginForm onLogin={handleLogin} />
            </div>
          </div>
        )}
        {/* User Dropdown */}
        {showUserMenu && token && (
          <div className="user-dropdown" ref={userMenuRef}>
            <div className="user-info">
              <div style={{ fontWeight: 600 }}>{userInfo.username}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{userInfo.email}</div>
            </div>
            <button className="user-logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
        <Routes>
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/cars" element={<CarList refresh={refresh} />} />
          {/* Default route for admin/user dashboard */}
          <Route path="/" element={token ? (
            isAdmin ? (
              <div className="admin-dashboard">
                <h2 style={{ textAlign: 'center', margin: '32px 0 18px 0', fontWeight: 800, fontSize: '2.2rem', letterSpacing: 1 }}>Admin Dashboard</h2>
                <AddCarForm token={token} onAdd={handleAdd} />
                <CarList refresh={refresh} />
              </div>
            ) : (
              <div className="user-browse">
                <h2 style={{ textAlign: 'center', margin: '32px 0 18px 0', fontWeight: 800, fontSize: '2.2rem', letterSpacing: 1 }}>Browse Cars</h2>
                <CarList refresh={refresh} />
              </div>
            )
          ) : null} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
