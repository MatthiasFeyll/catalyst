'use client';

import { Sections } from '@/config/sections';
import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';
import { useNavigation } from './NavigationProvider';

const ScrollSyncContext = createContext(null);

export const ScrollSyncProvider = ({ children }: { children: ReactNode }) => {
  const { activePage, setUrl } = useNavigation();
  const isProgrammaticScroll = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) {
          isProgrammaticScroll.current = false;
          return;
        }

        // Find the section that is most visible
        const mostVisibleSection = entries.reduce((prev, current) => {
          return (prev?.intersectionRatio ?? 0) > current.intersectionRatio ? prev : current;
        });

        if (mostVisibleSection && mostVisibleSection.intersectionRatio > 0.5) {
          const sectionId = mostVisibleSection.target.id;
          const currentSection = Sections.find((section) => section.id === sectionId);

          if (currentSection && currentSection.id !== activePage.id) {
            isProgrammaticScroll.current = true;
            setUrl(currentSection);
          }
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1], // More granular threshold values
        root: document.getElementsByTagName('main')[0] || null,
        rootMargin: '-10% 0px -10% 0px', // Adjust the detection area
      },
    );

    // Observe all sections
    Sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activePage.id, setUrl]);

  return <ScrollSyncContext.Provider value={null}>{children}</ScrollSyncContext.Provider>;
};

export const useScrollSync = () => {
  const context = useContext(ScrollSyncContext);
  if (!context) {
    throw new Error('useScrollSync must be used within a ScrollSyncProvider');
  }
  return context;
};
