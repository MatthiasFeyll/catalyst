// pages/404.js
import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Image */}
            <div
                className='absolute inset-0 bg-fixed
            brightness-[30%] md:brightness-[25%] grayscale-[0.85] contrast-[89%]
            bg-[length:350%] bg-[position:60%_10%]
            md:bg-[length:350%] md:bg-[position:55%_10%]
            lg:bg-[length:170%] lg:bg-[position:55%_10%]'
                style={{ backgroundImage: 'url(/images/background/mf_looking_left_full.jpg)' }}
            />
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: '' }}
            >
                {/* Gradient overlay */}
                <div className="absolute inset-0  bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,transparent_60%)]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col">
                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center align-middle ">
                    <div className='flex flex-row items-center align-middle'>
                        <span className="text-8xl font-bold text-primary pe-5  border-e-4 border-primary">404</span>
                        <span className="text-4xl ps-5 font-semibold text-white">Page Not Found</span>
                    </div>

                    <Link
                        href="/"
                        className="bg-primary w-fit mt-8 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}