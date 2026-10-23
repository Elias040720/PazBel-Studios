import React, { useEffect, useRef } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        margin: 'auto',
        maxWidth: '560px',
        width: 'calc(100% - 32px)',
        maxHeight: '85vh',
        overflowY: 'auto',
        backgroundColor: '#131826',
        color: '#f6f7fb',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        borderRadius: 'var(--radius-outer-md)',
        padding: '36px 30px',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8)',
        zIndex: 100,
      }}
      aria-labelledby="modal-title"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 id="modal-title" style={{ fontSize: '22px', fontWeight: 600 }}>
          {title}
        </h3>
        <button
          onClick={onClose}
          aria-label="Cerrar ventana"
          style={{
            fontSize: '24px',
            lineHeight: 1,
            color: '#a6adbd',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          ×
        </button>
      </div>
      <div>{children}</div>
    </dialog>
  );
};
