import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
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
    <>
      <Navbar />
      <div className="page-container" style={{ alignItems: 'flex-start', paddingTop: '3rem' }}>
        
        <div className="form-card" style={{ maxWidth: '700px', backgroundColor: 'var(--color-bg-dark)' }}> {/* Form lebih lebar */}
          
          <div className="form-header" style={{ marginBottom: '1.5rem' }}>
            <h1>Lapor Barang Temuan</h1>
            <p>Isi detail barang yang Anda temukan untuk memudahkan pemilik melacaknya.</p>
          </div>

          <form onSubmit={handleSubmit}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Nama Barang</label>
                    <input type="text" placeholder="Contoh: Dompet Kulit Coklat" className="form-input" 
                        onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Lokasi Ditemukan</label>
                    <input type="text" placeholder="Contoh: Kantin Teknik" className="form-input" 
                        onChange={(e) => setLocation(e.target.value)} required />
                </div>
            </div>
            
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Deskripsi & Ciri-ciri</label>
            <textarea 
                rows="3"
                placeholder="Jelaskan kondisi barang, warna, isi, atau ciri khusus lainnya..." 
                className="form-input"
                style={{ resize: 'none' }}
                onChange={(e) => setDescription(e.target.value)} required
            ></textarea>
            
            {/* Custom File Upload Area */}
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Foto Barang</label>
            <div className="upload-area">
                <input 
                    type="file" 
                    id="file-upload" 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange} 
                    accept="image/*"
                    required={!preview}
                />
                
                <label htmlFor="file-upload" style={{ display: 'block', padding: '16px', cursor: 'pointer' }}>
                    {preview ? (
                        <div style={{ position: 'relative' }}>
                            <img src={preview} alt="Preview" className="upload-area-preview" />
                            <p style={{ color: '#888' }}>Klik untuk Ganti Foto</p>
                        </div>
                    ) : (
                        <div>
                            <p style={{ fontSize: '16px', marginBottom: '4px' }}><span className="upload-label-text">Klik untuk upload</span> atau drag foto kesini</p>
                            <p style={{ fontSize: '12px', color: '#888' }}>SVG, PNG, JPG (MAX. 5MB)</p>
                        </div>
                    )}
                </label>
            </div>

            <button 
                type="submit" 
                className="form-button"
                style={{ marginTop: '24px' }}
                disabled={isLoading}
            >
                {isLoading ? 'Sedang Mengirim...' : 'Kirim Laporan Sekarang'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItem;