'use client';

import { Sections } from '@/config/sections';
import { useNavigation } from '@/provider/NavigationProvider';
import { useEffect, useRef, useState } from 'react';

const TRANSITION_TIME = 1500;

type Background = {
  url: string;
  opacity: number;
  state: 'entering' | 'leaving' | 'stable';
};

export const DynamicBackground = () => {
  const { activePage } = useNavigation();
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadingImages = useRef<Set<string>>(new Set());

  const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (loadingImages.current.has(url)) {
        reject(new Error('Already loading'));
        return;
      }

      loadingImages.current.add(url);
      const img = new Image();
      img.src = url;

      img.onload = () => {
        loadingImages.current.delete(url);
        resolve();
      };

      img.onerror = () => {
        loadingImages.current.delete(url);
        reject(new Error('Failed to load image'));
      };
    });
  };

  useEffect(() => {
    const newBgUrl = Sections.find((page) => page.id === activePage.id)?.background_url;
    if (!newBgUrl) return;

    // Skip if it's already the top background
    if (backgrounds[0]?.url === newBgUrl) return;

    const updateBackgrounds = async () => {
      try {
        // Preload the new image
        await preloadImage(newBgUrl);

        setBackgrounds((prev) => {
          const newBackgrounds: Background[] = [
            // Add new background
            {
              url: newBgUrl,
              opacity: 0, // Start transparent
              state: 'entering',
            },
          ];

          // Handle existing backgrounds
          if (prev.length > 0) {
            newBackgrounds.push({
              ...prev[0],
              state: 'leaving',
            });
          }

          return newBackgrounds;
        });

        // Start the fade-in animation in the next frame
        requestAnimationFrame(() => {
          setBackgrounds((prev) =>
            prev.map((bg, index) => ({
              ...bg,
              opacity: index === 0 ? 1 : 0,
            })),
          );
        });

        // Clean up after transition
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setBackgrounds((prev) =>
            prev
              .filter((bg) => bg.state === 'entering')
              .map((bg) => ({
                ...bg,
                state: 'stable',
              })),
          );
        }, TRANSITION_TIME);
      } catch (error) {
        console.error('Failed to update background:', error);
      }
    };

    updateBackgrounds();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activePage.id]);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {backgrounds.map(({ url, opacity, state }) => (
        <div
          key={`${url}-${state}`}
          className={`
            absolute inset-0 bg-fixed
            brightness-[30%] md:brightness-[25%] 
            grayscale-[0.85] contrast-[89%]
            bg-[length:350%] bg-[position:60%_10%]
            md:bg-[length:350%] md:bg-[position:55%_10%]
            lg:bg-[length:130%] lg:bg-[position:55%_10%]
            transform-gpu will-change-opacity
            transition-opacity duration-500 ease-out
          `}
          style={{
            backgroundImage: `url(${url})`,
            opacity,
            zIndex: state === 'entering' ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
};
