"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ResponsiveContextType = {
    isMobile: boolean;
};

const ResponsiveContext = createContext<ResponsiveContextType | null>(null);

export const ResponsiveProvider = ({ children }: { children: React.ReactNode }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <ResponsiveContext.Provider value={{ isMobile }}>
            {children}
        </ResponsiveContext.Provider>
    );
};

export const useResponsive = () => {
    const context = useContext(ResponsiveContext);
    if (!context) {
        throw new Error('useResponsive must be used within a ResponsiveContext');
    }
    return context;
};