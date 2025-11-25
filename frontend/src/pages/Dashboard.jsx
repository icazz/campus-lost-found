import React, { useEffect, useState, useMemo } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState('ALL'); 
  const [searchQuery, setSearchQuery] = useState('');
  const { userId, isLoading: isAuthLoading } = useAuth(); 

  const BASE_URL = 'http://localhost:5000'; 

  useEffect(() => {
    if (!isAuthLoading) {
      fetchItems();
    }
  }, [isAuthLoading]);

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

  const filteredItems = useMemo(() => {
    let currentItems = items;
    const query = searchQuery.toLowerCase();

    if (filterMode === 'MINE' && userId) {
      currentItems = currentItems.filter(item => item.founder._id === userId);
    }

    if (query) {
        currentItems = currentItems.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.location.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );
    }

    return currentItems;
  }, [items, filterMode, userId, searchQuery]);


  const handleDelete = async (id) => {
    if (confirm('Yakin mau hapus? Aksi ini tidak dapat dibatalkan!')) {
      try {
        await API.delete(`/items/${id}`);
        fetchItems(); 
      } catch (error) {
        alert('Gagal hapus! Anda tidak memiliki izin untuk menghapus laporan ini.');
      }
    }
  };

  if (isAuthLoading || loading) {
    return (
      <div className="navbar-layout">
        <Navbar />
        <div className="dashboard-content" style={{ textAlign: 'center', paddingTop: '50px' }}>
          <h1 style={{ color: 'var(--color-primary)' }}>Memuat Laporan...</h1>
        </div>
      </div>
    );
  }
  
  const myItemCount = items.filter(item => item.founder._id === userId).length;
  const allItemCount = items.length;
  const hasItems = filteredItems.length > 0;

  return (
    <div className="navbar-layout">
      <Navbar />
      
      <div className="dashboard-content">
        <div className="container-limit">
            
            <h1 className="dashboard-header">Barang Temuan</h1>
            <p className="dashboard-subheader">Daftar barang-barang yang ditemukan di kampus</p>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Cari barang (nama, lokasi, deskripsi)..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="filter-container">
                <div 
                    className={`filter-tab ${filterMode === 'ALL' ? 'active' : ''}`}
                    onClick={() => setFilterMode('ALL')}
                >
                    Semua Laporan ({allItemCount})
                </div>
                <div 
                    className={`filter-tab ${filterMode === 'MINE' ? 'active' : ''}`}
                    onClick={() => setFilterMode('MINE')}
                >
                    Laporan Saya ({myItemCount})
                </div>
            </div>

            {!hasItems && (
                <div className="empty-state-card">
                    <div className="empty-state-icon">📦</div>
                    <h2 className="empty-state-title">
                        {searchQuery ? 'Tidak ada hasil untuk "' + searchQuery + '"' : 
                         (filterMode === 'MINE' ? 'Anda Belum Melaporkan Barang' : 'Tidak Ada Laporan Saat Ini')}
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                        {searchQuery ? 'Coba kata kunci lain.' : 
                         (filterMode === 'MINE' ? 'Mulai laporkan barang temuan Anda sekarang!' : 
                         'Belum ada barang aktif yang dilaporkan oleh siapa pun.')}
                    </p>
                    <Link to="/add" className="form-button" style={{ width: 'auto', display: 'inline-block' }}>
                        Lapor Barang Sekarang
                    </Link>
                </div>
            )}

            {hasItems && (
                <div className="dashboard-grid">
                  {filteredItems.map((item) => (
                    <div key={item._id} className="item-card">
                      
                      <img 
                        src={`${BASE_URL}/uploads/${item.imageUrl}`} 
                        alt={item.name} 
                        className="item-card-image"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/600x400?text=Gambar+Rusak"; }}
                      />
                      
                      <div className="item-card-body">
                        
                        <h3 className="item-card-title">{item.name.toLowerCase()}</h3>
                        
                        <p className="item-card-meta" style={{ color: 'var(--color-primary)', fontWeight: '500' }}>📍 {item.location}</p>
                        
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', marginLeft: '1.25rem' }}>
                            {item.description}
                        </p>
                        
                        <div className="item-card-footer">
                          
                          <span className="item-card-founder" style={{ color: 'var(--color-text-secondary)' }}>
                              Ditemukan oleh: {item.founder?.username || 'Anonim'}
                          </span>
                          
                          {userId && item.founder && (item.founder._id === userId) && (
                            <button 
                              onClick={() => handleDelete(item._id)} 
                              className="btn-delete"
                            >
                              Hapus
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;