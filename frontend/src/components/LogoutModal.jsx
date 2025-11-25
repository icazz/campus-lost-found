import React from 'react';

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-message">
                    Apakah Anda yakin ingin keluar dari akun ini?
                </div>
                <div className="modal-actions">
                    <button onClick={onCancel} className="modal-button btn-cancel-modal">
                        Batal
                    </button>
                    <button onClick={onConfirm} className="modal-button btn-confirm-modal">
                        Keluar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;