'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface AlbumProps {
  images: string[];
}

export default function Album({ images }: AlbumProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const albumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentAlbumRef = albumRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !imagesLoaded) {
            setImagesLoaded(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentAlbumRef) {
      observer.observe(currentAlbumRef);
    }

    return () => {
      if (currentAlbumRef) {
        observer.unobserve(currentAlbumRef);
      }
    };
  }, [imagesLoaded]);

  // Keyboard navigation for fullscreen mode
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, activeIndex]);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleMainImageClick = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const handlePrevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div ref={albumRef} className="max-w-md mx-auto min-h-screen relative flex flex-col items-center overflow-hidden border-x border-gray-100 dark:border-gray-800 shadow-2xl bg-[#FFFBF2] dark:bg-[#1A1A1A]" style={{ fontFamily: '"Montserrat", sans-serif' }}>
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="40" id="grid-album" patternUnits="userSpaceOnUse" width="40">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
            </pattern>
          </defs>
          <rect fill="url(#grid-album)" height="100%" width="100%"></rect>
        </svg>
      </div>
      
      {/* Header divider */}
      <div className="w-full h-24 flex items-center justify-center pt-8">
        <div className="w-16 h-px bg-[#D4AF37]/50"></div>
        <div className="mx-4 flex items-center justify-center text-[#D4AF37]">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: '"FILL" 0, "wght" 300' }}>
            photo_library
          </span>
        </div>
        <div className="w-16 h-px bg-[#D4AF37]/50"></div>
      </div>
      
      <main className="flex-1 w-full px-8 py-6 text-center z-10 flex flex-col items-center">
        <header className="mb-8">
          <p className="text-3xl text-[#8B1D2F] mb-2" style={{ fontFamily: '"Dancing Script", cursive' }}>Album ảnh cưới</p>
        </header>
        
        <div className="w-full flex flex-col items-center space-y-4 max-w-[320px]">
          {/* Main image */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full aspect-[3/4] rounded-[10px] overflow-hidden shadow-lg border border-gray-200 bg-gray-100 cursor-pointer"
            onClick={handleMainImageClick}
          >
            {imagesLoaded && (
              <Image
                alt={`Wedding Photo ${activeIndex + 1}`}
                className="object-cover"
                src={images[activeIndex]}
                fill
                sizes="(max-width: 768px) 100vw"
              />
            )}
          </motion.div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2 w-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square rounded-[6px] overflow-hidden shadow-sm border border-gray-200 bg-gray-100 cursor-pointer transition-opacity ${
                  activeIndex === index ? 'opacity-100 ring-2 ring-[#D4AF37]' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                {imagesLoaded && (
                  <Image
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover"
                    src={image}
                    fill
                    sizes="(max-width: 768px) 25vw"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="w-full px-8 pb-24 pt-8 flex flex-col items-center z-10">
        <div className="w-full flex items-center justify-center mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
        </div>
        <p className="italic text-sm text-center text-gray-600 dark:text-gray-400 px-4" style={{ fontFamily: '"Playfair Display", serif' }}>
          Sự hiện diện của quý khách là niềm vinh hạnh của <br />chúng tôi
        </p>
      </footer>
      
      {/* Left decorative bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#8B1D2F] flex items-center">
        <div className="w-full h-1/4 bg-[#D4AF37] opacity-30"></div>
      </div>
      
      {/* Fullscreen modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeFullscreen}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                closeFullscreen();
              }}
              aria-label="Close fullscreen"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Previous button */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              aria-label="Previous image"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>

            {/* Next button */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              aria-label="Next image"
            >
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white text-sm backdrop-blur-sm">
              {activeIndex + 1} / {images.length}
            </div>

            {/* Main image */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-5xl max-h-[90vh] px-20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex]}
                alt={`Full size wedding photo ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
