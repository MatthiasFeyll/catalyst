'use client';

import { useResponsive } from '@/provider/ResponsiveProvider';
import { useCallback } from 'react';
import { Particles } from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

export default function ParticlesComponent() {
  const { isMobile } = useResponsive();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-20">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: 'transparent' } },
          fullScreen: { enable: false },
          particles: {
            number: {
              value: isMobile ? 20 : 45,
              density: {
                enable: true,
                value_area: isMobile ? 800 : 1800,
              },
            },
            color: { value: '#ce5316' },
            opacity: {
              value: { min: 0.1, max: 0.8 },
              animation: { enable: true, speed: 2 },
            },
            size: {
              value: {
                min: 1,
                max: isMobile ? 4 : 5,
              },
            },
            move: {
              enable: true,
              speed: isMobile ? 0.5 : 0.32,
              direction: 'none',
              random: true,
              straight: false,
              outModes: 'out',
            },
            links: { enable: false },
            shape: { type: 'circle' },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'bubble',
              },
              onClick: { enable: false },
            },
            modes: {
              bubble: {
                distance: 100,
                size: 8,
                duration: 0.3,
                color: '#ce5316',
              },
            },
          },
        }}
        className="w-full h-full opacity-80 pointer-events-none"
      />
    </div>
  );
}
