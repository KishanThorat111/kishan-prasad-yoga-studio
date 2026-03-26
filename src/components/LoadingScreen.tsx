import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    if (!container || !ring || !text) return;

    const duration = 2000;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          },
        });

        tl.to(text, {
          opacity: 0,
          y: -30,
          duration: 0.4,
          ease: 'power2.in',
        })
          .to(
            ring,
            {
              scale: 2,
              opacity: 0,
              duration: 0.6,
              ease: 'power3.inOut',
            },
            '-=0.2'
          )
          .to(
            container,
            {
              yPercent: -100,
              duration: 0.8,
              ease: 'power3.inOut',
            },
            '-=0.3'
          );
      }
    };

    requestAnimationFrame(updateProgress);

    gsap.fromTo(
      text,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.3 }
    );

    return () => {
      gsap.killTweensOf([container, ring, text]);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="loading-screen"
    >
      <div ref={ringRef} className="loading-ring mb-12" />

      <div ref={textRef} className="text-center">
        <h1 
          className="font-display text-4xl md:text-6xl font-bold tracking-[0.2em] mb-2"
          style={{ 
            background: 'linear-gradient(135deg, #FF9933, #C1440E)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          KISHAN & PRASAD
        </h1>
        <p className="text-sm tracking-[0.3em] uppercase" style={{ color: '#888' }}>
          Yoga Studio
        </p>
        <p className="text-xs mt-4 tracking-wider" style={{ color: '#FF9933' }}>
          {Math.round(progress)}%
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-96 h-96 rounded-full border border-white/5"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
