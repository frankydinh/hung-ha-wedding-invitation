'use client';

import React, { useState, useRef, useEffect } from 'react';
import Banner from '@/components/Banner';
import TiecCuoi from '@/components/TiecCuoi';
import ThanhHon from '@/components/ThanhHon';
import Album from '@/components/Album';
import FloatingButtons from '@/components/FloatingButtons';
import CurtainEffect from '@/components/CurtainEffect';
import { GuestData, WeddingEventData } from '@/types';

const SLIDE_IMAGES = [
  '/slide_images/DSC05099.png',
  '/slide_images/DSC05423.png',
  '/slide_images/DSC05362.png',
  '/slide_images/DSC05186.png',
  '/slide_images/DSC03488.png',
  '/slide_images/DSC03683.png',
  '/slide_images/DSC03856.png',
  '/slide_images/DSC03886.png',
  '/slide_images/DSC04202.png',
  '/slide_images/DSC04619.png',
  '/slide_images/DSC04539.png',
  '/slide_images/DSC04607.png',
];

interface InvitationClientProps {
  guestData: GuestData;
  groomEventData: WeddingEventData;
  brideEventData: WeddingEventData;
}

export default function InvitationClient({ 
  guestData, 
  groomEventData, 
  brideEventData 
}: InvitationClientProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element once
    audioRef.current = new Audio('/wedding-music.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
  };

  const handleCurtainComplete = () => {
    setShowContent(true);
  };

  const eventData = guestData.guestType === 'groom' ? groomEventData : brideEventData;

  if (!isOpened) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <Banner 
          onOpenInvitation={handleOpenInvitation} 
          guestName={guestData.name}
          guestType={guestData.guestType}
          isMusicPlaying={isMusicPlaying}
          toggleMusic={toggleMusic}
        />
      </div>
    );
  }

  return (
    <>
      <div id="invitation-content" className="min-h-screen bg-[#FFFBF2]">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <TiecCuoi guestData={guestData} eventData={eventData} />
            <ThanhHon guestData={guestData} eventData={eventData} />
            <Album images={SLIDE_IMAGES} />
          </div>
        </div>
        {showContent && (
          <FloatingButtons 
            guestType={guestData.guestType}
            isMusicPlaying={isMusicPlaying}
            toggleMusic={toggleMusic}
          />
        )}
      </div>
      <CurtainEffect isOpen={isOpened} onAnimationComplete={handleCurtainComplete} />
    </>
  );
}
