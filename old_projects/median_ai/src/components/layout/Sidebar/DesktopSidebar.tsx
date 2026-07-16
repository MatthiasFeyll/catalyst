'use client';
import { Sections, StartSection } from '@/config/sections';
import { useNavigation } from '@/provider/NavigationProvider';
import Image from 'next/image';
import Link from 'next/link';

export const DesktopSidebar = () => {
  const { activePage, navigate } = useNavigation();

  return (
    <div
      className="hidden lg:block fixed top-[5vh] left-[10vw] right-[10vw] w-[80vw] 
                      rounded-lg py-5 border-3 border-dark z-50
                      bg-dark/85 backdrop-blur-sm"
    >
      <nav className="px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href={`#${StartSection.id}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(StartSection);
            }}
            className={`flex items-center text-white no-underline`}
          >
            <Image
              src="/images/mf_looking_direct.jpg"
              alt="Matthias Feyll"
              width={30}
              height={30}
              className="h-[30px] rounded-full mr-4 border-primary/50 border shadow-md shadow-primary/30"
            />
            <span className="text-lg/4">Matthias Feyll</span>
          </Link>

          <div className="flex space-x-8">
            {Sections.map((page, i) => (
              <Link
                key={`${page.name}-${i}`}
                href={`#${page.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(page);
                }}
                className={`text-white no-underline transition-colors duration-200
                                          hover:text-primary border-primary capitalize
                                         ${activePage.id === page.id ? 'border-b-2 ' : ''}`}
              >
                {page.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};
