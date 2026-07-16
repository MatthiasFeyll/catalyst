"use client";

import { SectionType, Sections, StartSection } from "@/config/sections";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type NavigationContextType = {
    activePage: SectionType;
    navigate: (page: SectionType) => void;
    setUrl: (page: SectionType) => void;
};

const NavigationContext = createContext<NavigationContextType | null>(null);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
    const [activePage, setActivePage] = useState<SectionType>(StartSection);
    const lockTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
    const [lock, setLock] = useState<boolean>(false);

    const navigate = (page: SectionType) => {
        if (lock) return;

        document.getElementById(page.id)?.scrollIntoView()
        setUrl(page)
        setLock(true)

        /** Automatically release the lock.
         *  this prevents when navigate is getting
         *  invoked but the main container does not scroll
         *  so no scrollend event is getting triggered to release
         *  the lock
         */
        lockTimeout.current = setTimeout(() => {
            setLock(false)
        }, 1000)
    };

    const setUrl = (page: SectionType) => {
        if (lock) return;

        window.history.replaceState(null, "", `#${page.id}`);
        setActivePage(page);
    };

    useEffect(() => {
        const hash = window.location.hash;
        const current = Sections.find(
            (page) => page.id === hash
        );

        if (current) setActivePage(current)
    }, []);

    // release lock
    useEffect(() => {
        const releaseLock = () => { setLock(false); clearTimeout(lockTimeout.current) }

        const container = document.getElementsByTagName('main')[0];
        container?.addEventListener('scrollend', releaseLock)

        return () => container?.removeEventListener('scrollend', releaseLock)
    }, [])

    return (
        <NavigationContext.Provider value={{ activePage, navigate, setUrl }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};