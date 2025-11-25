import React from 'react';

const SuccessModal = ({ isOpen, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 'bold' }}>
                    ✓
                </div>
                <div className="modal-message" style={{ fontWeight: 'bold' }}>
                    Laporan Berhasil!
                </div>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '25px' }}>
                    Barang Anda sudah tercatat dan siap ditemukan.
                </p>
                <div className="modal-actions" style={{ justifyContent: 'center' }}>
                    <button onClick={onConfirm} className="modal-button btn-kirim" style={{ backgroundColor: 'var(--color-primary)' }}>
                        Lihat Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;