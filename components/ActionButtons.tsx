'use client';

import React, { useState } from 'react';
import Toast from './Toast';

interface ActionButtonsProps {
  guestType: 'groom' | 'bride';
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  variant?: 'banner' | 'floating';
}

export default function ActionButtons({ guestType, isMusicPlaying, toggleMusic, variant = 'floating' }: ActionButtonsProps) {
  const [showToast, setShowToast] = useState(false);

  const downloadAsImage = async () => {
    try {
      // Show toast notification
      setShowToast(true);

      // Determine which pre-generated image to download
      const imageName = guestType === 'groom' 
        ? 'thiep-cuoi-hung-ha-nha-trai.png' 
        : 'thiep-cuoi-hung-ha-nha-gai.png';
      
      // Fetch the pre-generated image
      const response = await fetch(`/${imageName}`);
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'thiep-cuoi-hung-ha.png';
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Không thể tải ảnh. Vui lòng thử lại.');
    }
  };

  // Banner variant styles
  if (variant === 'banner') {
    return (
      <>
        <div className="absolute bottom-8 left-0 right-0 px-8 flex justify-between items-center z-40">
          <button 
            onClick={toggleMusic}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-gold-light hover:bg-black/40 transition-all active:scale-95 shadow-lg group"
            aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
          >
            <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">
              {isMusicPlaying ? 'music_note' : 'music_off'}
            </span>
          </button>
          <button 
            onClick={downloadAsImage}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gold-medium/80 backdrop-blur-md border border-white/20 text-white hover:bg-gold-dark transition-all active:scale-95 shadow-lg group"
          >
            <span className="material-symbols-outlined text-xl group-hover:translate-y-1 transition-transform">download</span>
          </button>
        </div>

        {/* Toast notification */}
        {showToast && (
          <Toast 
            message="Đang tải thiệp cưới. Vui lòng đợi" 
            onClose={() => setShowToast(false)}
            duration={5000}
          />
        )}
      </>
    );
  }

  // Floating variant styles (default)
  return (
    <>
      {/* Music button */}
      <button
        className="fixed bottom-6 left-6 z-50 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200"
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
      >
        <span
          className="material-symbols-outlined text-[#8B1D2F] text-[24px]"
          style={{ fontVariationSettings: '"FILL" 0, "wght" 400' }}
        >
          {isMusicPlaying ? 'music_note' : 'music_off'}
        </span>
      </button>

      {/* Download button */}
      <button
        className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200"
        onClick={downloadAsImage}
        aria-label="Download invitation"
      >
        <span
          className="material-symbols-outlined text-[#8B1D2F] text-[24px]"
          style={{ fontVariationSettings: '"FILL" 0, "wght" 400' }}
        >
          download
        </span>
      </button>

      {/* Toast notification */}
      {showToast && (
        <Toast 
          message="Đang tải thiệp cưới. Vui lòng đợi" 
          onClose={() => setShowToast(false)}
          duration={5000}
        />
      )}
    </>
  );
}
