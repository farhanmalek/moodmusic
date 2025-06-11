'use client'
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface PortalModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const PortalModal: React.FC<PortalModalProps> = ({ isOpen, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/70 backdrop-blur-md">
      {children}
    </div>,
    document.body
  );
};

export default PortalModal;