import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import CampusLogo from '../assets/logo.png'; 
import { jwtDecode } from 'jwt-decode';
import LogoutModal from './LogoutModal'; 

const Navbar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getUsernameFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.username || "Pengguna"; 
        } catch (e) {
            return "Pengguna";
        }
    }
    return null;
  };

  const currentUsername = getUsernameFromToken();


  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    setIsModalOpen(false);
    navigate('/login');
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true); 
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <LogoutModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />

      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={CampusLogo} 
            alt="Campus Lost & Found Logo" 
            style={{ height: '35px', marginRight: '10px' }} 
          />
          <h1 className="navbar-title">Campus Lost & Found</h1>
        </div>
        
        <div className="navbar-links" style={{ display: 'flex', alignItems: 'center' }}>
          
          <Link to="/dashboard" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '600', padding: '8px 0', marginLeft: '1.5rem' }}>
              Beranda
          </Link>
          
          <Link to="/add" className="btn-lapor" style={{ marginLeft: '1.5rem', backgroundColor: '#f2c75a', color: 'var(--color-text-primary)' }}>
            + Lapor Barang
          </Link>

          {currentUsername && (
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1.5rem' }}>
                  
                  <span style={{ 
                      color: 'var(--color-text-primary)', 
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      marginRight: '0.5rem'
                  }}>
                      {currentUsername}
                  </span>

                  <span className="navbar-separator"></span>

                  <button 
                      onClick={handleLogoutClick}
                      className="logout-btn-clean"
                      style={{ marginLeft: '0.5rem', color: 'var(--color-text-secondary)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-destructive)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'} 
                  >
                      Logout
                  </button>
              </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;