"use client";

import { Sections, StartSection } from "@/config/sections";
import { useNavigation } from "@/provider/NavigationProvider";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import './ScrollButton.scss';

export const ScrollButton = () => {
    const { navigate, activePage } = useNavigation();
    const [isVisible, setIsVisible] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    // Handle initial animation and page changes
    useEffect(() => {
        if (activePage === StartSection) {
            // First appearance delay only on initial mount
            const timer = setTimeout(() => {
                setIsVisible(true);
                setShouldAnimate(true);
            }, 350);
            return () => clearTimeout(timer);
        } else {
            // Immediate fade out when leaving StartPage
            setIsVisible(false);
        }
    }, [activePage]);

    return (
        <button
            onClick={() => { navigate(Sections[1]) }}
            className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-transparent border border-white flex items-center justify-center transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            style={{
                animation: isVisible && shouldAnimate
                    ? "subtle-bounce 2s infinite"
                    : "none"
            }}
        >
            <FontAwesomeIcon icon={faArrowDown} />
        </button>
    );
};