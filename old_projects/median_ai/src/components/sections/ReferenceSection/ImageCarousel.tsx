'use client';
import { useSwipe } from '@/components/hooks/useSwipe';
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ImageCarouselProps = {
  images: Array<{ src: string; title: string }>;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export const ImageCarousel = ({
  images,
  selectedIndex,
  onIndexChange,
  onClose,
}: ImageCarouselProps) => {
  const handleNext = useCallback(
    () => onIndexChange((selectedIndex + 1) % images.length),
    [selectedIndex, images, onIndexChange],
  );
  const handlePrev = useCallback(
    () => onIndexChange(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1),
    [selectedIndex, images, onIndexChange],
  );
  const componentRef = useRef<HTMLDivElement>(null);

  useSwipe({
    elementRef: componentRef,
    allowedDirections: ['left', 'right', 'up', 'down'],
    onSwipe: (direction) =>
      direction === 'left' ? handleNext() : direction === 'right' ? handlePrev() : onClose(),
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev, onClose]);

  const portalRoot = typeof document !== 'undefined' ? document.getElementById('modal-root') : null;

  if (!portalRoot) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={componentRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-hidden p-32 md:pt-[20vh] bg-dark/60 backdrop-blur-md"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-20 md:top-28 right-6 md:right-24 p-3 text-white hover:text-primary transition-colors z-50"
        >
          <FontAwesomeIcon icon={faXmark} className="w-8 h-8" />
        </button>

        <div className="flex flex-col items-center justify-center h-full">
          {/* Main Image Container */}
          <div className="relative h-4/5 flex items-center justify-center p-4">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full"
              >
                <Image
                  src={images[selectedIndex].src}
                  className="max-w-min w-screen h-full object-contain cursor-pointer"
                  alt={`Fullscreen view - Image ${selectedIndex + 1}`}
                  onClick={onClose}
                  width={500}
                  height={500}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/85 text-white text-center p-4 text-sm md:text-base">
                  {images[selectedIndex].title}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="h-1/5 w-screen">
            <div className="flex gap-2 justify-center overflow-x-auto">
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`shrink-0 cursor-pointer rounded-lg border-2 ${
                    selectedIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => onIndexChange(index)}
                >
                  <Image
                    src={img.src}
                    className="h-20 w-28 object-cover rounded-lg"
                    alt={`Thumbnail ${index + 1}`}
                    loading="lazy"
                    width={1500}
                    height={1500}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    portalRoot,
  );
};
