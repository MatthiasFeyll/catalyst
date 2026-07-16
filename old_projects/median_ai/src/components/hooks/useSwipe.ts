import { useCallback, useEffect, useRef } from 'react';

type SwipeDirection = 'left' | 'right' | 'up' | 'down';

interface SwipeConfig {
    onSwipe?: (direction: SwipeDirection) => void;
    threshold?: number;
    allowedDirections?: SwipeDirection[];
    elementRef?: React.RefObject<HTMLElement | null>; // New prop for target element
}

export const useSwipe = (config: SwipeConfig) => {
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const touchElement = useRef<EventTarget | null>(null);
    const {
        threshold = 20,
        allowedDirections = ['left', 'right'],
        elementRef, // Reference to the element we want to track
    } = config;

    const isElementVisible = useCallback((element: HTMLElement | null) => {
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        // Consider an element visible if it's mostly in the viewport (>50%)
        const verticallyVisible =
            (rect.top >= -rect.height / 2 && rect.top <= windowHeight - rect.height / 2) ||
            (rect.bottom >= rect.height / 2 && rect.bottom <= windowHeight + rect.height / 2);

        const horizontallyVisible =
            rect.left >= -rect.width / 2 &&
            rect.right <= windowWidth + rect.width / 2;

        return verticallyVisible && horizontallyVisible;
    }, []);

    const handleTouchStart = useCallback((e: TouchEvent) => {
        const targetElement = elementRef?.current;

        // If an elementRef is provided, check if the touch started within it or its children
        if (targetElement) {
            const touchTarget = e.target as Node;
            if (!targetElement.contains(touchTarget)) {
                return;
            }

            // Check if the element is visible
            if (!isElementVisible(targetElement)) {
                return;
            }
        }

        touchElement.current = e.target;
        touchStart.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };
    }, [elementRef, isElementVisible]);

    const handleTouchEnd = useCallback((e: TouchEvent) => {
        // Ensure this is the same element we started touching
        if (!touchStart.current || touchElement.current !== e.target) return;

        const targetElement = elementRef?.current;
        if (targetElement && !isElementVisible(targetElement)) {
            touchStart.current = null;
            touchElement.current = null;
            return;
        }

        const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        const delta = {
            x: touchEnd.x - touchStart.current.x,
            y: touchEnd.y - touchStart.current.y,
        };

        let direction: SwipeDirection | null = null;

        if (Math.abs(delta.x) > Math.abs(delta.y)) {
            if (delta.x > threshold) direction = 'right';
            else if (delta.x < -threshold) direction = 'left';
        } else {
            if (delta.y > threshold) direction = 'down';
            else if (delta.y < -threshold) direction = 'up';
        }

        if (direction && allowedDirections.includes(direction)) {
            config.onSwipe?.(direction);
        }

        touchStart.current = null;
        touchElement.current = null;
    }, [threshold, allowedDirections, config, elementRef, isElementVisible]);

    useEffect(() => {
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleTouchStart, handleTouchEnd]);
};