import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { registerUser } from '../api/auth';
import loginBg from '../assets/login-bg1.mp4';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({ name, email, password });
      login(data.user);
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-page'>
      <div className='navbar' onClick={() => navigate('/')}>
        <h1>GWM</h1>
      </div>
      {/* Background Video */}
      <video
        className='login-bg-video'
        src={loginBg}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Dark overlay on video */}
      <div className='login-video-overlay' />

      <style>
        {`
          .auth-submit-btn {
            background-color: #433b35;
            transition: background 0.3s ease;
          }
          .auth-submit-btn:hover:not(:disabled) {
            background-color: #000;
          }
          .auth-input:focus {
            border-color: rgba(201,169,110,0.8) !important;
            box-shadow: 0 0 8px rgba(201,169,110,0.2);
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div className='login-container'>
        <h1 style={styles.heading}>SIGN UP</h1>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              className="auth-input"
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              className="auth-input"
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              className="auth-input"
            />
          </div>
          <button type="submit" style={styles.button} className="auth-submit-btn" disabled={loading}>
            {loading ? <div style={styles.spinner}></div> : 'CREATE ACCOUNT'}
          </button>
        </form>
        <p style={styles.linkText}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  heading: {
    fontFamily: "'Boska-Bold', serif",
    color: 'rgba(201,169,110,0.8)',
    fontSize: '36px',
    marginBottom: '30px',
    letterSpacing: '2px',
    marginTop: 0,
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    width: '100%'
  },
  input: {
    width: '100%',
    padding: '16px 24px',
    borderRadius: '50px',
    border: '1px solid rgba(201,169,110,0.4)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: '#fff',
    fontFamily: "'Supreme-Regular', sans-serif",
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
  },
  button: {
    width: '100%',
    padding: '16px',
    borderRadius: '50px',
    border: 'none',
    color: '#fff',
    fontFamily: "'Boska-Bold', serif",
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    letterSpacing: '1px'
  },
  error: {
    color: '#ff6b6b',
    fontFamily: "'Supreme-Regular', sans-serif",
    fontSize: '14px',
    marginBottom: '20px',
    backgroundColor: 'rgba(255,107,107,0.1)',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid rgba(255,107,107,0.3)'
  },
  linkText: {
    color: '#aaa',
    fontFamily: "'Supreme-Regular', sans-serif",
    fontSize: '15px',
    marginTop: '30px',
    marginBottom: 0,
    textAlign: 'center'
  },
  link: {
    color: 'rgba(201,169,110,0.8)',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginLeft: '5px'
  },
  spinner: {
    width: '24px',
    height: '24px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderTop: '3px solid #fff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

export default Signup;
