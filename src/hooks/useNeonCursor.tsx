import { useEffect } from 'react';

export const useNeonCursor = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fff;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: box-shadow 0.3s ease;
    `;
    document.body.appendChild(cursor);

    const colors = [
      'rgba(255, 0, 255, 0.8)',
      'rgba(0, 255, 255, 0.8)',
      'rgba(255, 255, 0, 0.8)',
      'rgba(0, 255, 0, 0.8)',
      'rgba(255, 0, 0, 0.8)',
      'rgba(0, 0, 255, 0.8)'
    ];
    let colorIndex = 0;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - 10}px`;
      cursor.style.top = `${e.clientY - 10}px`;
    };

    const changeColor = () => {
      colorIndex = (colorIndex + 1) % colors.length;
      cursor.style.boxShadow = `0 0 10px ${colors[colorIndex]}, 0 0 20px ${colors[colorIndex]}, 0 0 30px ${colors[colorIndex]}`;
    };

    document.addEventListener('mousemove', moveCursor);
    const colorInterval = setInterval(changeColor, 1000);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      clearInterval(colorInterval);
      cursor.remove();
    };
  }, []);
}; 