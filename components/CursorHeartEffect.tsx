'use client';

import { useEffect, useState, useRef } from 'react';

interface Heart {
  id: string;
  x: number;
  y: number;
}

export default function CursorHeartEffect() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const heartIdCounter = useRef(0);

  useEffect(() => {
    let lastTime = Date.now();
    const throttleDelay = 16; // Create hearts every 16ms when moving (3x more frequent)

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      // Create 3 hearts with slight random offset for natural effect
      const newHearts: Heart[] = [];
      for (let i = 0; i < 3; i++) {
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        const heartId = `${now}-${heartIdCounter.current++}`;
        
        const newHeart: Heart = {
          id: heartId,
          x: e.clientX + offsetX,
          y: e.clientY + offsetY,
        };

        newHearts.push(newHeart);
        
        setTimeout(() => {
          setHearts((prev) => prev.filter((h) => h.id !== heartId));
        }, 1000);
      }
      
      setHearts((prev) => [...prev, ...newHearts]);

    };

    const handleTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      const touch = e.touches[0];
      if (!touch) return;

      // Create 3 hearts with slight random offset for natural effect
      const newHearts: Heart[] = [];
      for (let i = 0; i < 3; i++) {
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        const heartId = `${now}-${heartIdCounter.current++}`;
        
        const newHeart: Heart = {
          id: heartId,
          x: touch.clientX + offsetX,
          y: touch.clientY + offsetY,
        };

        newHearts.push(newHeart);
        
        setTimeout(() => {
          setHearts((prev) => prev.filter((h) => h.id !== heartId));
        }, 1000);
      }
      
      setHearts((prev) => [...prev, ...newHearts]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-particle"
          style={{
            left: heart.x,
            top: heart.y,
          }}
        >
          ❤
        </div>
      ))}
    </div>
  );
}
