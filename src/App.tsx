import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Components
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import WhatsAppButton from './components/WhatsAppButton';
import WebGLErrorBoundary from './components/WebGLErrorBoundary';

// Lazy-load WebGL (Three.js) to split it into a separate chunk
const WebGLCanvas = lazy(() => import('./components/WebGLCanvas'));

// Sections
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import YogaClassesSection from './sections/YogaClassesSection';
import InstructorsSection from './sections/InstructorsSection';
import ScheduleSection from './sections/ScheduleSection';
import ContactSection from './sections/ContactSection';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

// GPU Tier Detection
const detectGPU = (): 'high' | 'medium' | 'low' => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return 'low';
  
  const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
  if (debugInfo) {
    const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    
    if (/nvidia|amd|apple.*m1|apple.*m2|apple.*m3/i.test(renderer)) {
      return 'high';
    }
    if (/intel|adreno.*5|mali.*g/i.test(renderer)) {
      return 'medium';
    }
  }
  
  if (window.devicePixelRatio >= 2) {
    return 'medium';
  }
  
  return 'low';
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [gpuTier, setGpuTier] = useState<'high' | 'medium' | 'low'>('medium');
  const [isMobile, setIsMobile] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Detect device capabilities
  useEffect(() => {
    const tier = detectGPU();
    setGpuTier(tier);
    
    const mobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    setIsMobile(mobile);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (isMobile) return;
    
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after Lenis init
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      lenis.destroy();
    };
  }, [isMobile]);

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* WebGL Background Canvas */}
      <WebGLErrorBoundary>
        <Suspense fallback={null}>
          <WebGLCanvas gpuTier={gpuTier} isMobile={isMobile} />
        </Suspense>
      </WebGLErrorBoundary>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main 
        ref={mainRef}
        className={`relative transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        <HeroSection />
        <AboutSection />
        <YogaClassesSection />
        <InstructorsSection />
        <ScheduleSection />
        <ContactSection />
      </main>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Mobile Sticky Call Button */}
      <a 
        href="tel:+919538665107" 
        className="mobile-call-bar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        Call Kishan: +91 95386 65107
      </a>
    </>
  );
}

export default App;
