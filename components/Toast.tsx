'use client';

import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    // Auto close after duration
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="bg-[#8B1D2F] text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-white/10">
        <span className="material-symbols-outlined text-[#D4AF37] animate-pulse" style={{ fontVariationSettings: '"FILL" 1, "wght" 400' }}>
          download
        </span>
        <p className="text-sm font-medium" style={{ fontFamily: '"Montserrat", sans-serif' }}>
          {message}
        </p>
      </div>
    </div>
  );
}
