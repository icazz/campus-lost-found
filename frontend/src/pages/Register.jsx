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
      
      <div className="form-card" style={{ maxWidth: '500px' }}> {/* Card sedikit lebih lebar untuk 3 input */}
        
        <div className="form-header">
          <h1>Daftar Akun Baru</h1>
          <p>Buat akun Anda untuk mulai melaporkan</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{ padding: '10px', backgroundColor: '#4b0000', border: '1px solid #ff0000', borderRadius: '6px', marginBottom: '16px', color: '#ffaaaa', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          <label htmlFor="name" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
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

          <label htmlFor="username" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
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

          <label htmlFor="password" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
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

          <button 
            type="submit" 
            className="form-button"
            disabled={loading}
          >
            {loading ? 'Mendaftar...' : 'Daftar Akun'}
          </button>
        </form>

        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>
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