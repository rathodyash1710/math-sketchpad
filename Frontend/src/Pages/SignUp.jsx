import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
const styles = {
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: '#f0f2f5',
  },
  authForm: {
    margin: '10px',
    background: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
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
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  authButtonHover: {
    backgroundColor: '#218838',
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
const SignUp = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [dob, setDOB] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(gender);

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + 'auth/signup/',
        {
          first_name,
          last_name,
          dob,
          country,
          email,
          password: password1,
          password2,
          gender
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred during sign-up');
      console.error('Error during sign-up:', error.response || error.message);
    }
  };

  return (
    <div style={styles.authContainer}>
      <form onSubmit={handleSubmit} style={styles.authForm}>
        <h2 style={styles.h2}>Sign Up</h2>

        {/* Display error message */}
        {error && <p style={styles.errorMessage}>{error}</p>}

        <div style={styles.formGroup}>
          <label htmlFor="first_name" style={styles.label}>First Name:</label>
          <input
            type="text"
            id="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="last_name" style={styles.label}>Last Name:</label>
          <input
            type="text"
            id="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="dob" style={styles.label}>Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="country" style={styles.label}>Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            style={styles.input}
          />
        </div>

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
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password2" style={styles.label}>Confirm Password:</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Gender:</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                onChange={() => setGender('male')}
                required
              />
              Male
            </label>
            <label style={{ marginLeft: '10px' }}>
              <input
                type="radio"
                name="gender"
                onChange={() => setGender('female')}
                required
              />
              Female
            </label>
          </div>
        </div>

        <button
          type="submit"
          style={styles.authButton}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.authButtonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.authButton.backgroundColor}
        >
          Sign Up
        </button>

        <p style={styles.p}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
