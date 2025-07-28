// src/pages/RegisterPage.jsx
import { useState } from 'react';
import authService from '../services/authService';
import { useNavigate, Link } from 'react-router-dom'; 

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await authService.register(email, password);
      navigate('/login'); // Redirect to login on success
    } catch (err) {
      // Set error message from server response, or a default one
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
      console.error(err);
    }
  };

  const formStyle = {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: 'var(--background-light)',
    borderRadius: '8px',
  };

  const linkStyle = { color: 'var(--primary-accent)', textDecoration: 'none' };
  
  return (
    <div style={formStyle}>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          minLength="6"
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Already have an account? <Link to="/login" style={linkStyle}>Login here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;