import { useEffect } from 'react';

export const useMouseTrail = () => {
  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let trailX = mouseX;
    let trailY = mouseY;

    const updateCursor = () => {
      const cursorBefore = document.querySelector('body::before') as HTMLElement | null;
      const cursorAfter = document.querySelector('body::after') as HTMLElement | null;

    // Slower follow for water-like trail effect
    trailX += (mouseX - trailX) * 0.08;
    trailY += (mouseY - trailY) * 0.08;

    // Medium speed for inner glow
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

      // Update CSS custom properties
      document.documentElement.style.setProperty('--mouse-x', `${trailX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${trailY}px`);
      document.documentElement.style.setProperty('--cursor-x', `${cursorX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${cursorY}px`);

      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      document.documentElement.style.setProperty('--cursor-opacity', '1');
    };

    const handleMouseLeave = () => {
      document.documentElement.style.setProperty('--cursor-opacity', '0');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    updateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
};
