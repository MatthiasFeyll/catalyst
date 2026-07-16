'use client';

import { useResponsive } from '@/provider/ResponsiveProvider';
import {
  faBriefcaseClock,
  faChevronDown,
  faClock,
  faGraduationCap,
  faLocation,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

export const AboutMeSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const { isMobile } = useResponsive();

  // Calculate initial content height
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  return (
    <div className="min-h-screen md:w-[80vw] md:ms-[10vw] px-4 md:px-1 pt-[12vh] md:pt-[0vh] flex md:gird flex-col items-center md:flex-row gap-24">
      <div className="flex md:grid flex-col grid-cols-6">
        {/* Personal Info Cards */}
        <div className="grid md:hidden grid-cols-2 gap-4 pb-3">
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-800/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faClock} className="text-blue-400 w-5 h-5" />
              <div>
                <p className="m-0 font-semibold text-gray-100">27 years</p>
                <small className="text-gray-400 text-sm">Age</small>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-800/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faLocation} className="text-green-400 w-5 h-5" />
              <div>
                <p className="m-0 font-semibold text-gray-100">Darmstadt</p>
                <small className="text-gray-400 text-sm">Germany</small>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-4 col-span-3 my-auto">
          <h2 className="text-2xl font-semibold text-text border-b pb-2">About Me</h2>

          <div className="prose text-gray-300">
            <p className="leading-relaxed">
              With a decade of experience in software development, I gained theoretical as well as
              practical knowledge in different institutions. I started with an 3 year practical
              apprenticeship, followed by academic pursuit of a finished Bachelor and on going
              Master&apos;s degree in Computer Science.
            </p>
            <div
              ref={contentRef}
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isExpanded ? 'delay-300' : 'delay-0'
              }`}
              style={{
                maxHeight: isExpanded ? contentHeight : 0,
                // Reset height on desktop
                ...(!isMobile && { maxHeight: 'none' }),
              }}
            >
              <p className="leading-relaxed mt-2">
                Specializing in frontend architecture and user-centric design, I focus on creating
                scalable solutions that prioritize performance as well as maintainability. My
                motivation is to learn continuously to stay up to date with new technologies. This
                concerns frameworks, libraries as well as AI programming technologies.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden text-primary/70 font-medium hover:text-primary transition-colors"
          >
            {isExpanded ? 'Show less' : 'Show more'}
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transform transition-transform duration-100 delay-300 px-1 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Right Column - Content */}
        <div className="space-y-4 md:space-y-8 col-span-2 col-start-5">
          {/* Personal Info Cards */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-800/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faClock} className="text-blue-400 w-5 h-5" />
                <div>
                  <p className="m-0 font-semibold text-gray-100">27 years</p>
                  <small className="text-gray-400 text-sm">Age</small>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-800/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faLocationDot} className="text-green-400 w-5 h-5" />
                <div>
                  <p className="m-0 font-semibold text-gray-100">Darmstadt</p>
                  <small className="text-gray-400 text-sm">Germany</small>
                </div>
              </div>
            </div>
          </div>

          {/* Education Timeline with fade animation */}
          <div
            className={`transition-opacity duration-300 ${
              isExpanded ? 'opacity-0 delay-0' : 'opacity-100 delay-300'
            } md:opacity-100 md:delay-0`}
          >
            <div className="space-y-6">
              <h2 className="hidden md:block text-2xl font-semibold text-text border-b pb-2">
                Education
              </h2>

              <div className="absolute w-4 h-4 bg-primary-500 rounded-full -start-[9px] ring-4 ring-gray-900/20" />
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-800/50 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faGraduationCap} className="text-purple-400 w-6 h-6" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">
                      Master in Computer Science
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      University of Applied Sciences - Darmstadt
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-purple-900/30 text-purple-400 rounded-full">
                      Ongoing
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-800/50 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faBriefcaseClock} className="text-green-400 w-6 h-6" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">IT Apprenticeship</h3>
                    <p className="text-gray-400 text-sm mt-1">Reservix GmbH</p>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-green-900/30 text-green-400 rounded-full">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
