"use client"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useEffect, useState } from "react"
import { BaseSidebar } from "./BaseSidebar.module"

export const MobileSidebar = () => {
    const [showMobileSidebar, setShowMobileSidebar] = useState(false)

    useEffect(() => {
        if (showMobileSidebar) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [showMobileSidebar])

    const handleBackdropClick = () => {
        setShowMobileSidebar(false)
    }

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex justify-between items-center 
                          px-4 bg-dark py-2 h-[60px] backdrop-blur-sm">
                <button
                    onClick={() => setShowMobileSidebar(true)}
                    className="w-10 h-10 flex items-center justify-center
                             border border-primary text-white rounded"
                    aria-label="Open menu"
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <Image
                    src="/images/mf_looking_direct.jpg"
                    alt="Profile"
                    priority={true}
                    onClick={() => setShowMobileSidebar(true)}
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 border-[1.5px] border-primary/95
                             shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]"
                />
            </div>

            {/* Sidebar & Backdrop */}
            <div className={`fixed inset-0 z-40 lg:hidden opacity-0 transition-opacity duration-300
                         ${showMobileSidebar ? 'opacity-100 pointer-events-auto' :
                    'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-background/30 backdrop-blur-sm
                                lg:w-[calc(100%-280px)] lg:left-[280px]
                                md:w-[30%] md:left-[70%]"
                    onClick={handleBackdropClick}
                />

                {/* Sidebar */}
                <div className={`fixed top-0 left-0 h-full bg-dark/95 sm:w-[70%] transition-transform duration-300 ease-in-out
                              ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="relative p-4 pt-0">
                        <button
                            onClick={() => setShowMobileSidebar(false)}
                            className="absolute top-4 right-4 p-2 text-text/80 hover:text-text 
                                     transition-opacity duration-300"
                            aria-label="Close menu"
                        >
                            <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
                        </button>
                    </div>

                    <BaseSidebar onLinkClick={() => setShowMobileSidebar(false)} />
                </div>
            </div>
        </>
    )
}