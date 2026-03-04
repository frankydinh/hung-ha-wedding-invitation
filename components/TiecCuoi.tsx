'use client';

import React from 'react';
import { GuestData, WeddingEventData } from '@/types';

interface TiecCuoiProps {
  guestData: GuestData;
  eventData: WeddingEventData;
}

export default function TiecCuoi({ guestData, eventData }: TiecCuoiProps) {
  const isGroomGuest = guestData.guestType === 'groom';
  
  return (
    <div className="max-w-md mx-auto min-h-screen relative flex flex-col items-center overflow-hidden border-x border-gray-100 dark:border-gray-800 shadow-2xl bg-[#FFFBF2] dark:bg-[#1A1A1A]" style={{ fontFamily: '"Montserrat", sans-serif' }}>
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100%" width="100%"></rect>
        </svg>
      </div>
      
      {/* Header divider */}
      <div className="w-full h-24 flex items-center justify-center pt-8">
        <div className="w-16 h-px bg-[#D4AF37]/50"></div>
        <div className="mx-4 flex items-center justify-center text-[#D4AF37]">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: '"FILL" 0, "wght" 300' }}>
            restaurant
          </span>
        </div>
        <div className="w-16 h-px bg-[#D4AF37]/50"></div>
      </div>
      
      <main className="flex-1 w-full px-8 py-6 text-center z-10">
        <header className="mb-10">
          <p className="text-2xl text-[#8B1D2F] dark:text-[#D4AF37] mb-2" style={{ fontFamily: '"Dancing Script", cursive' }}>Tiệc cưới</p>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight uppercase text-gray-900 dark:text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
              {eventData.groomName}
            </h1>
            <p className="text-3xl text-[#D4AF37]" style={{ fontFamily: '"Dancing Script", cursive' }}>&amp;</p>
            <h1 className="text-4xl font-bold tracking-tight uppercase text-gray-900 dark:text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
              {eventData.brideName}
            </h1>
          </div>
        </header>
        
        <div className="relative py-12 mb-10 border-y border-[#D4AF37]/30">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFFBF2] dark:bg-[#1A1A1A] px-4 text-xs tracking-widest uppercase text-gray-500" style={{ fontFamily: '"Montserrat", sans-serif' }}>
            Trân trọng kính mời
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="text-3xl font-light" style={{ fontFamily: '"Playfair Display", serif' }}>
                <span style={{ color: '#8b1d2f' }}>{eventData.tieCuoiDate.split('/')[0]}</span>
              </span>
              <div className="w-px h-10 bg-[#D4AF37]"></div>
              <span className="text-3xl font-light text-[#8B1D2F] dark:text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
                <span className="text-gray-800">{eventData.tieCuoiDate.split('/')[1]}</span>
              </span>
              <div className="w-px h-10 bg-[#D4AF37]"></div>
              <span className="text-3xl font-light" style={{ fontFamily: '"Playfair Display", serif' }}>
                {eventData.tieCuoiDate.split('/')[2]}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-medium" style={{ fontFamily: '"Montserrat", sans-serif' }}>{eventData.tieCuoiTime}</p>
              <p className="text-sm italic text-gray-600 dark:text-gray-400" style={{ fontFamily: '"Montserrat", sans-serif' }}>
                {eventData.tieCuoiLunarDate}
              </p>
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FFFBF2] dark:bg-[#1A1A1A] px-4">
            <span className="material-symbols-outlined text-[#D4AF37] text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>
              favorite
            </span>
          </div>
        </div>
        
        <section className="space-y-6">
          <div className="space-y-1">
            <p className="italic text-xl" style={{ fontFamily: '"Playfair Display", serif' }}>
              {isGroomGuest ? 'Tại tư gia nhà trai' : 'Tại tư gia nhà gái'}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#8B1D2F] flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined">place</span>
            </div>
            <a className="group block max-w-[280px] mx-auto" href={isGroomGuest ? "https://maps.app.goo.gl/wJav9MQ2TgdABYs89?g_st=ic" : "https://maps.app.goo.gl/DhVczG5Z17npLDdy9?g_st=ic"} target="_blank" rel="noopener noreferrer">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed hover:text-[#8B1D2F] dark:hover:text-[#D4AF37] transition-colors" style={{ fontFamily: '"Montserrat", sans-serif' }}>
                {eventData.tieCuoiLocation}<br />
                <span className="font-semibold uppercase tracking-wider">
                  {eventData.tieCuoiProvince}
                </span>
              </p>
              <div className="mt-4 px-6 py-2 bg-[#8B1D2F] text-white rounded-full inline-flex items-center text-xs font-semibold uppercase tracking-tighter hover:bg-[#8B1D2F]/90 transition-colors shadow-md" style={{ fontFamily: '"Montserrat", sans-serif' }}>
                Xem bản đồ Google Maps
                <span className="material-symbols-outlined text-sm ml-1">open_in_new</span>
              </div>
            </a>
          </div>
        </section>
      </main>
      
      <footer className="w-full px-8 pb-24 pt-8 flex flex-col items-center z-10">
        <div className="w-full flex items-center justify-center mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
        </div>
        <p className="italic text-sm text-center text-gray-600 dark:text-gray-400 px-4" style={{ fontFamily: '"Playfair Display", serif' }}><br/></p>
      </footer>
      
      {/* Left decorative bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#8B1D2F] flex items-center">
        <div className="w-full h-1/4 bg-[#D4AF37] opacity-30"></div>
      </div>
    </div>
  );
}
