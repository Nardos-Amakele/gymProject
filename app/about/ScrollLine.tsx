'use client';
import { useEffect } from 'react';

const ScrollLine: React.FC = () => {
    useEffect(() => {
        const handleScroll = () => {
            const scrollLine = document.getElementById("scroll-line");
            if (scrollLine) {
                const scrollPosition = window.scrollY;
                scrollLine.style.backgroundColor = scrollPosition > 200 ? '#2596BE' : 'gray'; // Neon blue or gray based on scroll
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="relative">
            <div
                className="absolute left-1/2 transform -translate-x-1/2 w-1 h-screen bg-gray-500 transition-colors duration-500 ease-in-out"
                id="scroll-line"
            ></div>
        </div>
    );
};

export default ScrollLine;
