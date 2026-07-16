'use client';

import { Sections } from '@/config/sections';
import React, { useEffect, useRef, useState } from 'react';

export const Scrollbar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    if (!isScrolling) setIsScrolling(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsScrolling(false), 1000);

    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const maxTranslate = (Sections.length - 1) * 100;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * maxTranslate;

      setScrollPosition(progress);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <main
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`snap-y snap-mandatory scroll-smooth h-full z-20 overflow-y-auto
                  scrollbar-none scrollbar-track-transparent
                  transition-opacity duration-300
                  ${isScrolling ? 'scrollbar-thumb-opacity-50' : 'scrollbar-thumb-opacity-0'}
                  hover:scrollbar-thumb-opacity-50`}
        style={{ scrollSnapStop: 'always' }}
      >
        {children}
      </main>

      {/* Custom scrollbar track */}
      <div
        className={`fixed right-0 top-0 h-screen w-2 pointer-events-none
  transition-opacity duration-300 ${isScrolling ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute right-0 md:right-14 h-[80vh] top-[10vh] w-2 bg-gray-800/50 overflow-hidden">
          <div
            className="absolute right-0 w-full rounded-full bg-orange-700 transition-transform duration-200"
            style={{
              height: `${
                100 /
                Math.round(
                  (scrollContainerRef.current?.scrollHeight || 0) /
                    (scrollContainerRef.current?.clientHeight || 1)
                )
              }%`,
              transform: `translateY(${scrollPosition}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
