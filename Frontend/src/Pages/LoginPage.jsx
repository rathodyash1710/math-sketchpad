import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { SET_ACCESS_TOKEN } from '../constants';

const styles = {
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    backgroundColor: '#f0f2f5',
  },
  authForm: {
    background: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  },
  h2: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    color: '#333',
  },
  formGroup: {
    marginBottom: '1.2rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    backgroundColor: '#f9f9f9',
    transition: 'all 0.3s ease',
  },
  inputFocus: {
    borderColor: '#007bff',
    backgroundColor: '#fff',
    boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
  },
  authButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  authButtonHover: {
    backgroundColor: '#0056b3',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  p: {
    textAlign: 'center',
    marginTop: '1rem',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '500',
  },
  linkHover: {
    textDecoration: 'underline',
  },
};

const Login = ({ setLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/login/`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if (response.status == 200) {
        setLogin(true);
        SET_ACCESS_TOKEN(response.data.token);
        navigate('/');
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.log(error);

      setError(error.response.data.error);
    }

  };

  return (
    <div style={styles.authContainer}>
      <form onSubmit={handleSubmit} style={styles.authForm}>
        <h2 style={styles.h2}>Login</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          style={styles.authButton}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.authButtonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.authButton.backgroundColor}
        >
          Login
        </button>
        <p style={styles.p}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
