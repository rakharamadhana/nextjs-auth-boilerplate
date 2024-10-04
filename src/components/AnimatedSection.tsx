// src/components/AnimatedSection.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
    children: React.ReactNode; // Only children are needed
    className?: string; // Optional className prop
    initial?: object; // Custom initial animation state
    animate?: object; // Custom animate state
    transition?: object; // Custom transition properties
    whileHover?: object; // Optional hover animation state
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
                                                             children,
                                                             className,
                                                             initial = { opacity: 0, y: 20 }, // Default initial state
                                                             animate = { opacity: 1, y: 0 }, // Default animate state
                                                             transition = { duration: 0.5 }, // Default transition
                                                             whileHover, // Capture whileHover prop
                                                         }) => {
    return (
        <motion.section
            initial={initial} // Use custom initial state
            animate={animate} // Use custom animate state
            transition={transition} // Use custom transition properties
            whileHover={whileHover} // Use custom whileHover state
            className={`${className}`} // Use className prop
        >
            {children} {/* Render children directly */}
        </motion.section>
    );
};

export default AnimatedSection;
