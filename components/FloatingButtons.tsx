'use client';

import React from 'react';

interface FloatingButtonsProps {
  guestType: 'groom' | 'bride';
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

export default function FloatingButtons({ guestType, isMusicPlaying, toggleMusic }: FloatingButtonsProps) {
  const downloadAsImage = async () => {
    try {
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
    </>
  );
}
