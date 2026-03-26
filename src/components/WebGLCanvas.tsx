import { Canvas } from '@react-three/fiber';
import AgniParticles from './AgniParticles';

interface Props {
  gpuTier: 'high' | 'medium' | 'low';
  isMobile: boolean;
}

export default function WebGLCanvas({ gpuTier, isMobile }: Props) {
  return (
    <div className="webgl-canvas">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={gpuTier === 'high' ? [1, 2] : [1, 1]}
        gl={{
          antialias: gpuTier !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <AgniParticles gpuTier={gpuTier} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
