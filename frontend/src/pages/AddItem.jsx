import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AddItem = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Mohon lampirkan foto barang.");
    
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('image', file);

    try {
      await API.post('/items', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert('Barang berhasil dilaporkan!');
      navigate('/dashboard');
    } catch (error) {
      alert('Gagal upload barang. Pastikan semua data terisi dan file valid.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="navbar-layout">
      <Navbar />
      <div className="dashboard-content" style={{ paddingTop: '3rem', display: 'flex', justifyContent: 'center' }}>
        
        <div className="add-item-card">
          
          <div className="add-item-header">
            <h1>Lapor Barang Temuan</h1>
            <p>Isi form berikut untuk melaporkan barang yang Anda temukan</p>
          </div>

          <form onSubmit={handleSubmit}>
            
            <div style={{ marginBottom: '25px' }}>
                <label className="form-input-label">Nama Barang</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Kunci Motor, Dompet Merah, dll" 
                  className="form-input" 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
                <label className="form-input-label">Lokasi Ditemukan</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Perpustakaan, Parkiran, Kantin, dll" 
                  className="form-input" 
                  onChange={(e) => setLocation(e.target.value)} 
                  required 
                />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
                <label className="form-input-label">Deskripsi</label>
                <textarea 
                    rows="4"
                    placeholder="Deskripsikan ciri-ciri barang secara detail" 
                    className="form-input"
                    style={{ resize: 'none', height: '120px' }}
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                ></textarea>
            </div>

            <label className="form-input-label">Foto Barang</label>
            <div className="upload-box" onClick={() => document.getElementById('file-upload').click()}>
                <input 
                    type="file" 
                    id="file-upload" 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange} 
                    accept="image/*"
                    required={!preview}
                />
                
                {preview ? (
                    <div style={{ position: 'relative' }}>
                        <img src={preview} alt="Preview" className="upload-preview" />
                        <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem' }}>Klik untuk Ganti Foto</p>
                    </div>
                ) : (
                    <div>
                        <div className="upload-icon">📷</div>
                        <p style={{ color: 'var(--color-text-primary)', fontWeight: 'bold' }}>Pilih foto barang</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>PNG, JPG hingga 5MB</p>
                    </div>
                )}
            </div>

            <div className="form-actions">
                <Link to="/dashboard" className="btn-batal">
                    Batal
                </Link>
                <button 
                    type="submit" 
                    className="btn-kirim"
                    disabled={isLoading}
                >
                    {isLoading ? 'Mengirim...' : 'Kirim Laporan'}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;