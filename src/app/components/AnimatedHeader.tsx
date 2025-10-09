'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Configuration for the animated header
 */
interface AnimatedHeaderConfig {
  /** Scroll distance (px) for full animation */
  travel?: number;
  /** Logo width at start (px) */
  logoStartW?: number;
  /** Logo width at end (px) */
  logoEndW?: number;
  /** Header horizontal padding (px) - to align start position */
  containerPadX?: number;
  /** Header height (px) */
  height?: number;
  /** Background color */
  bgColor?: string;
  /** Logo image path */
  logoSrc?: string;
  /** Logo alt text */
  logoAlt?: string;
}

interface AnimatedHeaderProps {
  children: React.ReactNode;
  config?: AnimatedHeaderConfig;
}

const defaultConfig: Required<AnimatedHeaderConfig> = {
  travel: 200,
  logoStartW: 48,
  logoEndW: 58,
  containerPadX: 24,
  height: 80,
  bgColor: '#023039',
  logoSrc: '/images/camiyatrans.png',
  logoAlt: 'Camiya Diamonds',
};

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ children, config = {} }) => {
  const mergedConfig = { ...defaultConfig, ...config };
  const { travel, logoStartW, logoEndW, containerPadX, height, bgColor, logoSrc, logoAlt } = mergedConfig;

  const headerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Track scroll position
  const { scrollY } = useScroll();

  // Transform scroll position to 0-1 progress
  const scrollProgress = useTransform(scrollY, [0, travel], [0, 1]);

  // Calculate the target X position based on container width
  const startX = containerPadX;
  const endX = containerWidth / 2 - logoEndW / 2;
  
  // Animate translateX from start to center
  const translateX = useTransform(scrollProgress, (progress) => {
    if (containerWidth === 0) return startX;
    return startX + (endX - startX) * progress;
  });

  // Animate scale from 1 to logoEndW/logoStartW ratio
  const scaleRatio = logoEndW / logoStartW;
  const scale = useTransform(scrollProgress, [0, 1], [1, scaleRatio]);

  // Add spring physics for buttery smooth animation
  const smoothX = useSpring(translateX, { stiffness: 100, damping: 20, mass: 0.5 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20, mass: 0.5 });

  // Measure container width with ResizeObserver
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateWidth = () => {
      setContainerWidth(header.offsetWidth);
    };

    // Initial measurement
    updateWidth();

    // Watch for resize
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(header);

    return () => resizeObserver.disconnect();
  }, []);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      {/* Main header with regular content */}
      <header
        ref={headerRef}
        className="shadow-lg sticky top-0 z-50"
        style={{ backgroundColor: bgColor }}
      >
        {children}

        {/* Animated logo overlay - positioned absolutely */}
        <motion.div
          className="absolute top-0 left-0 flex items-center pointer-events-auto"
          style={{
            height: `${height}px`,
            x: prefersReducedMotion ? startX : smoothX,
            scale: prefersReducedMotion ? 1 : smoothScale,
            willChange: 'transform',
          }}
        >
          <Link href="/" className="flex items-center">
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={logoStartW}
              height={logoStartW}
              className="object-contain"
              priority
            />
          </Link>
        </motion.div>
      </header>
    </>
  );
};

export default AnimatedHeader;
