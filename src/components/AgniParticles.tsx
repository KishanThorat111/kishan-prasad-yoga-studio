import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AgniParticlesProps {
  gpuTier: 'high' | 'medium' | 'low';
  isMobile: boolean;
}

const agniVertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  
  attribute float aScale;
  attribute float aRandom;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vec3 pos = position;
    
    // Upward drift with turbulence
    float drift = uTime * (0.3 + aRandom * 0.3);
    pos.y += mod(drift, 12.0) - 6.0;
    
    // Horizontal turbulence
    float turbulence = sin(uTime * 1.5 + aRandom * 10.0) * 0.2;
    pos.x += turbulence * aRandom;
    pos.z += cos(uTime * 1.0 + aRandom * 8.0) * 0.15;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Size attenuation
    gl_PointSize = uSize * aScale * uPixelRatio * (8.0 / -mvPosition.z);
    
    gl_Position = projectionMatrix * mvPosition;
    
    // Color gradient: Terracotta to Saffron to Gold
    float colorMix = aRandom;
    vec3 terracotta = vec3(0.757, 0.267, 0.055);
    vec3 saffron = vec3(1.0, 0.6, 0.2);
    vec3 gold = vec3(0.722, 0.451, 0.2);
    
    if (colorMix < 0.33) {
      vColor = mix(terracotta, saffron, colorMix * 3.0);
    } else if (colorMix < 0.66) {
      vColor = mix(saffron, gold, (colorMix - 0.33) * 3.0);
    } else {
      vColor = gold;
    }
    
    // Alpha based on height
    float heightFactor = smoothstep(-6.0, -3.0, pos.y) * (1.0 - smoothstep(3.0, 6.0, pos.y));
    vAlpha = heightFactor * (0.5 + aRandom * 0.3);
  }
`;

const agniFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    if (dist > 0.5) discard;
    
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, 1.5);
    
    gl_FragColor = vec4(vColor, vAlpha * glow);
  }
`;

export default function AgniParticles({ gpuTier, isMobile }: AgniParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Determine particle count based on GPU tier
  const particleCount = useMemo(() => {
    if (isMobile) return 2000;
    if (gpuTier === 'high') return 30000;
    if (gpuTier === 'medium') return 10000;
    return 4000;
  }, [gpuTier, isMobile]);

  // Generate particle data
  const { positions, scales, randoms } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const randoms = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      positions[i3] = (Math.random() - 0.5) * 25;
      positions[i3 + 1] = (Math.random() - 0.5) * 15;
      positions[i3 + 2] = (Math.random() - 0.5) * 15;
      
      scales[i] = 0.5 + Math.random() * 1.5;
      randoms[i] = Math.random();
    }

    return { positions, scales, randoms };
  }, [particleCount]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 3.5 },
    }),
    []
  );

  useFrame((state) => {
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={agniVertexShader}
        fragmentShader={agniFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
