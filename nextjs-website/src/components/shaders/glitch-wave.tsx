'use client';

import { useSyncExternalStore, useRef } from 'react';
import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// Dynamically import GrainGradient with SSR disabled to ensure WebGL context mounts cleanly
const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then(mod => mod.GrainGradient),
  { ssr: false }
);

function subscribeEmpty() {
  return () => {};
}

interface GlitchWaveProps {
  children?: ReactNode;
  className?: string;
  speed?: number;
  intensity?: number;
  colors?: string[];
  colorBack?: string;
  minHeight?: string | number;
}

export default function GlitchWave({
  children,
  className,
  speed = 0.22,
  intensity = 0.35,
  colors = ['#EF4444', '#DC2626', '#1C1917'],
  colorBack = '#0A0000',
  minHeight = '100%',
}: GlitchWaveProps) {
  const mounted = useSyncExternalStore(subscribeEmpty, () => true, () => false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn('glitch-wave-container relative overflow-hidden', className)}
      style={{
        position: 'relative',
        minHeight,
        background: `radial-gradient(ellipse at top, ${colors[0]}22 0%, ${colorBack} 80%)`,
      }}
    >
      {/* Animated Fallback & Ambient Glow */}
      <div
        className="glitch-wave-glow"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 30%, ${colors[0]}33 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, ${colors[1]}28 0%, transparent 60%),
            linear-gradient(135deg, ${colorBack} 0%, rgba(20,8,8,0.95) 100%)
          `,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* WebGL GrainGradient Shader Layer */}
      {mounted && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
            opacity: 0.9,
          }}
        >
          <GrainGradient
            colors={colors}
            colorBack={colorBack}
            speed={speed}
            scale={0.42}
            rotation={-45}
            offsetX={0.3}
            offsetY={0.1}
            softness={0.45}
            intensity={intensity}
            noise={0.35}
            shape="wave"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      )}

      {/* Foreground Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
}
