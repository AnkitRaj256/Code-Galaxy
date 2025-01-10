// CustomCursor.js
import React, { useEffect, useRef } from 'react';
import './CSS/CustomCursor.css'; // Ensure this path is correct

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const animationFrameId = useRef(null);
  const targetPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPosition.current.x = e.clientX;
      targetPosition.current.y = e.clientY;
    };

    const animateCursor = () => {
      if (cursorRef.current) {
        // Interpolate the cursor position
        const { x, y } = targetPosition.current;
        const cursorRect = cursorRef.current.getBoundingClientRect();

        // Smooth transition
        cursorRef.current.style.left = `${x - cursorRect.width / 2}px`;
        cursorRef.current.style.top = `${y - cursorRect.height / 2}px`;
      }

      animationFrameId.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateCursor(); // Start the animation loop

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId.current); // Clean up
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} />;
};

export default CustomCursor;
