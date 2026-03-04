'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CurtainEffectProps {
  isOpen: boolean;
  onAnimationComplete?: () => void;
}

export default function CurtainEffect({ isOpen, onAnimationComplete }: CurtainEffectProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Left curtain */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
        onAnimationComplete={onAnimationComplete}
        className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#7D0A0A] origin-right"
        style={{
          background: 'linear-gradient(to right, #7D0A0A 0%, #630808 100%)',
        }}
      >
        {/* Gold line on right edge */}
        <div 
          className="absolute top-0 bottom-0 right-0 w-[3px] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          style={{
            background: 'linear-gradient(to bottom, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)'
          }}
        />
      </motion.div>

      {/* Right curtain */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#7D0A0A] origin-left"
        style={{
          background: 'linear-gradient(to left, #7D0A0A 0%, #630808 100%)',
        }}
      >
        {/* Gold line on left edge */}
        <div 
          className="absolute top-0 bottom-0 left-0 w-[3px] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          style={{
            background: 'linear-gradient(to bottom, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)'
          }}
        />
      </motion.div>
    </div>
  );
}
