'use client';

import { useSwipe } from '@/components/hooks/useSwipe';
import { ReferenceType } from '@/config/references';
import { useResponsive } from '@/provider/ResponsiveProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ImageCarousel } from './ImageCarousel';

type TabTypes = 'description' | 'images' | 'stack';
const Tabs: Array<TabTypes> = ['stack', 'description', 'images'];

export const ReferenceDetails = ({ reference }: { reference: ReferenceType }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeSection, setActiveSection] = useState<TabTypes>();
  const { isMobile } = useResponsive();
  const componentRef = useRef<HTMLDivElement>(null);

  useSwipe({
    allowedDirections: ['left', 'right'],
    elementRef: componentRef, // Pass the ref to the hook
    onSwipe: (direction) => {
      const index = Tabs.findIndex((tab) => tab === activeSection);

      if (direction === 'right' && index <= 0) return;
      if (direction === 'left' && index >= Tabs.length - 1) return;

      if (direction === 'right') setActiveSection(Tabs[index - 1]);
      if (direction === 'left') setActiveSection(Tabs[index + 1]);
    },
  });

  useEffect(() => {
    if (isMobile) {
      setActiveSection(Tabs[0]);
    } else setActiveSection(Tabs[1]);
  }, [isMobile]);

  if (!reference) return <div className="text-text/50">Select a reference to view details</div>;

  return (
    <div
      ref={componentRef}
      className="border-primary/20 border-2 rounded-lg p-4 lg:p-8 bg-black/10 backdrop-blur-sm h-full flex flex-col"
    >
      {/* Header Section */}
      <div className="space-y-2 mb-4 lg:mb-8">
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="text-primary p-2 lg:p-3 bg-primary/10 rounded-lg">
            <FontAwesomeIcon icon={reference.icon} className="w-5 h-5 lg:w-6 lg:h-6" />
          </div>
          <div>
            <h3 className="text-3xl lg:text-5xl font-bold">{reference.title}</h3>
            <p className="text-base lg:text-xl text-primary/80 mt-1 lg:mt-2">
              {reference.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 lg:gap-8 flex-1">
        {/* Left Column - Content Sections */}
        <div className="space-y-4">
          {/* Section Toggles */}
          <div className="flex gap-2 lg:gap-4 border-b border-primary/20 pb-2 lg:pb-4">
            <button
              onClick={() => setActiveSection(Tabs[0])}
              className={`lg:hidden px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base transition-colors ${
                activeSection === Tabs[0]
                  ? 'bg-primary/10 text-primary'
                  : 'text-text/70 hover:bg-primary/5'
              }`}
            >
              Tech Stack
            </button>
            <button
              onClick={() => setActiveSection(Tabs[1])}
              className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base transition-colors ${
                activeSection === Tabs[1]
                  ? 'bg-primary/10 text-primary'
                  : 'text-text/70 hover:bg-primary/5'
              }`}
            >
              Description
            </button>
            {reference.images.length > 0 ? (
              <button
                onClick={() => setActiveSection(Tabs[2])}
                className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base transition-colors ${
                  activeSection === Tabs[2]
                    ? 'bg-primary/10 text-primary'
                    : 'text-text/70 hover:bg-primary/5'
                }`}
              >
                Visuals ({reference.images.length})
              </button>
            ) : (
              <></>
            )}
          </div>

          {/* Content Areas */}
          <div className="relative min-h-[200px] lg:min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeSection === Tabs[1] && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-opacity-50 scrollbar-thumb-primary scrollbar-track-dark"
                >
                  <div className="scrollbar-thin h-full overflow-y-auto">
                    <p className="text-base lg:text-lg text-text/80 leading-relaxed">
                      {reference.description}
                    </p>
                  </div>
                </motion.div>
              )}

              {activeSection === Tabs[2] && reference.images && (
                <motion.div
                  key="images"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="inset-0"
                >
                  <div className="relative group h-full">
                    <div
                      className="relative aspect-video rounded-lg overflow-hidden border-2 border-primary/20 cursor-pointer"
                      onClick={() => setIsFullscreen(true)}
                    >
                      <AnimatePresence initial={false} mode="wait">
                        <motion.img
                          key={selectedImageIndex}
                          src={reference.images[selectedImageIndex].src}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full object-cover"
                          alt={`${reference.title} - Visual ${selectedImageIndex + 1}`}
                          loading="lazy"
                        />
                      </AnimatePresence>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {reference.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              selectedImageIndex === idx ? 'bg-primary' : 'bg-primary/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-2 lg:mt-4 overflow-x-auto pb-2">
                      {reference.images.map((img, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="shrink-0 h-[60px] w-[80px] lg:h-[90px] lg:w-[120px]"
                          onClick={() => setSelectedImageIndex(index)}
                        >
                          <Image
                            src={img.src}
                            alt={`Thumbnail ${index + 1}`}
                            className="h-full w-full object-cover rounded-lg"
                            loading="lazy"
                            width={150}
                            height={150}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === Tabs[0] && (
                <motion.div
                  key="stack"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="lg:hidden"
                >
                  <div className="space-y-2 lg:space-y-8">
                    <div className="grid grid-cols-1 gap-2 lg:gap-3">
                      {reference.tags.map((tech, index) => (
                        <div
                          key={index}
                          className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg bg-black/20 text-text/80 border border-transparent text-sm lg:text-base flex items-center gap-2"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary/50" />
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column - Tag & Actions */}
        <div className="lg:flex flex-col space-y-4 lg:space-y-8 lg:border-l lg:border-primary/10 lg:pl-8 h-full">
          {/* Tag Group */}
          <div className="hidden lg:flex flex-col space-y-2 lg:space-y-4 flex-1">
            <h4 className="text-lg lg:text-xl font-semibold text-primary/80 border-b border-primary/20 pb-1 lg:pb-2">
              Tags
            </h4>
            <div className="grid grid-cols-1 gap-2 lg:gap-3">
              {reference.tags.map((tech, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg bg-black/20 text-text/80 border border-transparent text-sm lg:text-base flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-primary/50" />
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {reference.actions && (
            <div className="mt-auto pt-4 lg:pt-8">
              <div className="flex flex-col gap-2 lg:gap-3">
                {reference.actions.map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 lg:px-6 lg:py-3 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 
                                            transition-colors text-primary flex items-center justify-center gap-2 lg:gap-3 text-sm lg:text-lg"
                    onClick={() => window.open(action.url, '_blank')}
                  >
                    {action.icon && (
                      <FontAwesomeIcon icon={action.icon} className="w-4 h-4 lg:w-5 lg:h-5" />
                    )}
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Carousel */}
      {isFullscreen && reference.images && (
        <ImageCarousel
          images={reference.images}
          selectedIndex={selectedImageIndex}
          onIndexChange={setSelectedImageIndex}
          onClose={() => setIsFullscreen(false)}
        />
      )}
    </div>
  );
};
