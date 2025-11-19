import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await API.post('/auth/login', formData);
      localStorage.setItem('token', data.token);
      navigate('/dashboard'); 
    } catch (err) {
      const message = err.response?.data?.message || 'Gagal terhubung ke server.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      
      <div className="form-card">
        
        <div className="form-header">
          <h1>Campus Lost & Found</h1>
          <p>Masuk ke akun Anda</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{ padding: '10px', backgroundColor: '#4b0000', border: '1px solid #ff0000', borderRadius: '6px', marginBottom: '16px', color: '#ffaaaa', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          <label htmlFor="username" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Masukkan username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label htmlFor="password" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Masukkan password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />

          <button 
            type="submit" 
            className="form-button"
            disabled={loading}
          >
            {loading ? 'Masuk...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>
          Belum punya akun?{' '}
          <Link to="/register" className="form-link">
            Daftar di sini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;