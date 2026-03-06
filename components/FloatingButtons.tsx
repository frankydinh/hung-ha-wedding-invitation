'use client';

import React from 'react';
import ActionButtons from './ActionButtons';

interface FloatingButtonsProps {
  guestType: 'groom' | 'bride';
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

export default function FloatingButtons({ guestType, isMusicPlaying, toggleMusic }: FloatingButtonsProps) {
  return (
    <ActionButtons 
      guestType={guestType}
      isMusicPlaying={isMusicPlaying}
      toggleMusic={toggleMusic}
      variant="floating"
    />
  );
}
