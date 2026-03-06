'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import ActionButtons from './ActionButtons';

interface BannerProps {
  onOpenInvitation: () => void;
  guestName?: string;
  guestType: 'groom' | 'bride';
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

export default function Banner({ onOpenInvitation, guestName, guestType, isMusicPlaying, toggleMusic }: BannerProps) {
  const showGuestName = guestName && guestName !== 'Quý khách' && guestName !== 'generic';

  // Format guest name to display max 2 words per line
  const formatGuestName = (name: string) => {
    const words = name.trim().split(/\s+/);
    const lines: string[] = [];
    
    for (let i = 0; i < words.length; i += 2) {
      const line = words.slice(i, i + 2).join(' ');
      lines.push(line);
    }
    
    return lines;
  };

  const guestNameLines = showGuestName ? formatGuestName(guestName) : [];

  // Handle scroll down event to open invitation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        onOpenInvitation();
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [onOpenInvitation]);
  
  return (
    <div className="relative w-full max-w-[450px] h-screen bg-primary shadow-2xl overflow-hidden border-x border-gold-dark/20">
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCYa24BzKh1ED9fhBsYvl-ubEsoRVQERH3c2Wfm6FOrCiQAYxRCvUtscIb_l7aq4JGXFtEnu-AwNfrStcMIGBhkvqNXqCCVt3zzLLOgjRe9SwqvgWF0VhwiTPWhvmIHYz22Bm7Ive15ZU79Snbg6uszjNlDg8Qm335XgTQAl4dGXm420kr2XOql35sp7ccpvdoo3YNrq-4hQBATWgUwNnT2wDWjy3WXkeO-VVAz31x57oaGljCmy3Luv27DUsqefIECCeYs6iFGUZI)'
        }}
      />
      
      {/* Main content */}
      <div className="flex h-full w-full">
        {/* Left section */}
        <div className="w-2/3 h-full relative flex flex-col justify-center px-8 z-10">
          {showGuestName && (
            <div className="mb-6 space-y-1 -translate-y-[30px]">
              <p className="text-gold-light/80 italic text-[15.6px] tracking-wide" style={{ fontFamily: '"Playfair Display", serif' }}>Trân trọng kính mời:</p>
              <div className="text-[2.88rem] text-gold-light drop-shadow-sm leading-tight" style={{ fontFamily: '"Pinyon Script", cursive' }}>
                {guestNameLines.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          )}
          {!showGuestName && (
            <div className="space-y-2 mb-12 -translate-y-6">
              <p className="text-gold-light/60 uppercase tracking-[0.3em] text-[10px]" style={{ fontFamily: '"Montserrat", sans-serif' }}>Official Invitation</p>
              <h1 className="text-5xl md:text-6xl text-gold-light leading-none drop-shadow-md" style={{ fontFamily: '"Pinyon Script", cursive' }}>
                Save the <br/>Date
              </h1>
              <div className="w-12 h-[1px] bg-gold-medium/50 mt-4"></div>
            </div>
          )}
          
          {/* Decorative star */}
          <div className="absolute top-10 left-8 opacity-20">
            <svg className="text-gold-light" fill="currentColor" height="60" viewBox="0 0 100 100" width="60">
              <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z"></path>
            </svg>
          </div>
        </div>
        
        {/* Right section */}
        <div className="w-1/3 h-full bg-[#630808] dark:bg-[#4d0606] border-l-[0.5px] border-white/5 relative">
          <div className="absolute top-1/4 -right-12 rotate-90 opacity-10 whitespace-nowrap">
            <p className="text-6xl text-white" style={{ fontFamily: '"Pinyon Script", cursive' }}>Love Forever</p>
          </div>
        </div>
      </div>
      
      {/* Gold divider line */}
      <div className="absolute top-0 bottom-0 left-[66.666%] w-[3px] gold-gradient shadow-[0_0_15px_rgba(212,175,55,0.3)] z-20"></div>
      
      {/* Wax seal */}
      <div 
        className="absolute top-1/2 left-[66.666%] -translate-x-1/2 -translate-y-1/2 z-30 wax-seal-shadow hover:scale-105 transition-transform duration-500 cursor-pointer"
        onClick={onOpenInvitation}
      >
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <Image 
            alt="Burgundy Wax Seal with Infinity Symbol and Laurel Wreath" 
            className="w-full h-full object-contain" 
            src="/wax.png"
            width={128}
            height={128}
          /> 
        </div>
      </div>
      
      {/* Action Buttons */}
      <ActionButtons 
        guestType={guestType}
        isMusicPlaying={isMusicPlaying}
        toggleMusic={toggleMusic}
        variant="banner"
      />
      
      {/* Top right corner decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-30 pointer-events-none">
        <svg className="text-gold-light fill-current" height="80" viewBox="0 0 100 100" width="80">
          <path d="M100 0 L100 100 L95 100 L95 5 C95 5 95 0 90 0 L0 0 L0 0 Z"></path>
        </svg>
      </div>
      
      {/* Bottom right corner decoration */}
      <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
        <svg className="text-gold-light" fill="none" height="120" stroke="currentColor" strokeWidth="1" viewBox="0 0 200 200" width="120">
          <circle cx="100" cy="100" r="80"></circle>
          <circle cx="100" cy="100" r="70"></circle>
          <path d="M100 30 Q120 100 100 170"></path>
          <path d="M30 100 Q100 120 170 100"></path>
        </svg>
      </div>
      
      {/* Tap to open indicator */}
      <div 
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center z-40 cursor-pointer"
        style={{
          animation: 'float 4s ease-in-out infinite'
        }}
        onClick={onOpenInvitation}
      >
        <p className="text-gold-light text-[11px] font-medium tracking-[0.25em] uppercase mb-2 drop-shadow-sm" style={{ fontFamily: '"Montserrat", sans-serif' }}>Tap to open</p>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gold-light to-transparent mx-auto opacity-60"></div>
      </div>
    </div>
  );
}
