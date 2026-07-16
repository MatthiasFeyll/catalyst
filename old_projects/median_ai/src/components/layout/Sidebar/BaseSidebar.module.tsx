'use client';
import { Sections } from '@/config/sections';
import { useNavigation } from '@/provider/NavigationProvider';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  onLinkClick: () => void;
}

export const BaseSidebar = ({ onLinkClick }: Props) => {
  const { activePage, navigate } = useNavigation();

  return (
    <div className="h-full px-6 py-8 flex flex-col">
      <div
        className="text-center mb-8 relative after:content-[''] after:absolute after:bottom-4 
                          after:left-1/2 after:-translate-x-1/2 after:translate-y-5 after:w-full md:after:w-2/4 after:h-px 
                          after:bg-gray-400 after:rounded"
      >
        <Image
          src="/images/mf_looking_direct.jpg"
          alt="Matthias Feyll"
          priority={true}
          width={50}
          height={50}
          className="w-[50px] h-[50px] rounded-full object-cover border-[1.5px] 
                             border-primary/10 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] 
                             mx-auto mb-6 transition-all duration-300 ease-in-out
                             hover:scale-105 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] 
                             hover:border-primary"
        />
        <h2 className="text-primary text-4xl mb-1 font-semibold">Matthias Feyll</h2>
        <p className="text-text/90 text-lg tracking-wider">Software Developer</p>
      </div>

      <nav className="flex-grow flex flex-col gap-2">
        {Sections.map((page) => {
          return (
            <Link
              key={page.name}
              href={`#${page.name}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(page);
                onLinkClick();
              }}
              className={`text-text no-underline px-6 py-4 text-xl text-center relative 
                                     transition-all duration-300 ease-in-out hover:bg-primary/10
                                     after:content-[''] after:absolute after:bottom-[15px] 
                                     after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 
                                     after:bg-primary after:rounded after:opacity-0 
                                     after:transition-all after:duration-300 after:ease-in-out
                                     ${
                                       activePage === page
                                         ? 'after:w-2/4 md:after:w-1/4 after:opacity-100'
                                         : ''
                                     }`}
            >
              {page.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
