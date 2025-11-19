import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">🎒 Campus Lost & Found</h1>
      <div className="navbar-links">
        <Link to="/dashboard">Beranda</Link>
        <Link to="/add" className="btn-lapor">
          + Lapor Barang
        </Link>
        <button onClick={handleLogout} style={{ color: 'var(--color-destructive)' }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;