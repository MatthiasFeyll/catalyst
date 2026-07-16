'use client';
import { DesktopSidebar } from '@/components/layout/Sidebar/DesktopSidebar';
import { MobileSidebar } from '@/components/layout/Sidebar/MobileSidebar';
import { DynamicBackground } from '@/components/ui/DynamicBackground';
import ParticlesComponent from '@/components/ui/Particles';
import { Scrollbar } from '@/components/ui/Scrollbar';
import { Sections } from '@/config/sections';
import { ScrollSyncProvider } from '@/provider/ScrollSyncProvider';
import React from 'react';

export default function Home() {
  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
      <DynamicBackground />
      <ParticlesComponent />

      {/* Grain overlay */}
      <div
        className="fixed inset-0 opacity-40 md:opacity-40 pointer-events-none 
              bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9Im4iPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIuNyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iLjMiLz48L3N2Zz4=')]
              bg-[size:200px] mix-blend-color-dodge"
      ></div>
      <Scrollbar>
        <ScrollSyncProvider>
          {Sections.map(({ component, id }, i) => (
            <div key={i} id={`${id}`} className="snap-center h-screen w-full">
              <div>{React.createElement(component)}</div>
            </div>
          ))}
          <div id="modal-root"></div>
        </ScrollSyncProvider>
      </Scrollbar>
    </>
  );
}
