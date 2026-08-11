import React from 'react';

const ConfirmationDialog = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content confirmation-dialog">
                <div className="dialog-icon">
                    <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Confirm Action</h3>
                <p>{message}</p>
                <div className="dialog-actions">
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                    <button className="confirm-delete-btn" onClick={onConfirm}>Yes, Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
