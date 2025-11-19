import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = 'http://localhost:5000'; 

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/items');
      setItems(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin mau hapus? Aksi ini tidak dapat dibatalkan!')) {
      try {
        await API.delete(`/items/${id}`);
        fetchItems(); 
      } catch (error) {
        alert('Gagal hapus! Akses ditolak (Ini bukan postingan Anda).');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-content">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Daftar Barang Temuan</h1>
        
        {loading && <div style={{ textAlign: 'center', color: 'var(--color-primary)' }}>Memuat data...</div>}

        {!loading && items.length === 0 && (
          <div className="form-card" style={{ maxWidth: 'none', textAlign: 'center', marginTop: '20px' }}>
            <p style={{ color: '#888' }}>Belum ada barang yang dilaporkan.</p>
            <Link to="/add" style={{ color: 'var(--color-primary)', display: 'block', marginTop: '10px' }}>Laporkan barang temuan pertama Anda!</Link>
          </div>
        )}

        <div className="dashboard-grid">
          {items.map((item) => (
            <div key={item._id} className="item-card">
              
              <img 
                src={`${BASE_URL}/uploads/${item.imageUrl}`} 
                alt={item.name} 
                className="item-card-image"
                onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/600x400?text=Gambar+Rusak"; }}
              />
              
              <div className="item-card-body">
                <h3 className="item-card-title">{item.name}</h3>
                <p className="item-card-meta">📍 {item.location}</p>
                <p style={{ fontSize: '0.9rem', color: '#ccc' }}>{item.description}</p>
                
                <div className="item-card-footer">
                  <span style={{ fontSize: '0.75rem', color: '#999' }}>Ditemukan oleh: <b>{item.founder?.username || 'Anonim'}</b></span>
                  
                  <button 
                    onClick={() => handleDelete(item._id)} 
                    className="btn-delete"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;