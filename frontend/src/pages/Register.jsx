import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', username: '', password: '' });
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
      await API.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      const message = err.response?.data?.message || 'Gagal terhubung ke server.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      
      <div className="form-card" style={{ maxWidth: '500px' }}> 
        
        <div className="form-header">
          <h1>Campus Lost & Found</h1>
          <p>Daftar akun baru</p>
        </div>

        {error && (
          <div style={{ padding: '10px', backgroundColor: 'var(--color-error-bg)', border: '1px solid var(--color-destructive)', borderRadius: '6px', marginBottom: '16px', color: 'var(--color-error-text)', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          <div className="form-group-item">
            <label htmlFor="name" className="form-input-label">
              Nama Lengkap
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group-item">
            <label htmlFor="username" className="form-input-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Pilih username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group-item">
            <label htmlFor="password" className="form-input-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Buat password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <button 
            type="submit" 
            className="form-button"
            style={{ marginTop: '30px' }}
            disabled={loading}
          >
            {loading ? 'Mendaftar...' : 'Daftar Akun'}
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>
          Sudah punya akun?{' '}
          <Link to="/login" className="form-link">
            Login di sini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;