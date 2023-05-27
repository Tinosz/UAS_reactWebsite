import React, { useEffect, useState } from 'react';
import '../styles/cursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseOver = (event) => {
      const targetElement = event.target;
      const clickableElements = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'SVG', 'IMG', 'LI'];
      const isElementWithC = targetElement.classList.contains('C');

      if (clickableElements.includes(targetElement.tagName) || isElementWithC) {
        setIsActive(true);
      } else {
        const clickableAncestor = clickableElements.some((element) =>
          targetElement.closest(element)
        );
        setIsActive(clickableAncestor);
      }
    };

    const handleMouseOut = () => {
      setIsActive(false);
      shrinkCursor();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    if (isActive) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [isActive]);

  function shrinkCursor() {
    const rings = document.querySelector('.rings');
    rings.classList.add('shrink');
    setTimeout(() => {
      rings.classList.remove('shrink');
    }, 300);
  }

  return (
    <div
      className={`rings ${isActive ? 'active' : ''}`}
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    ></div>
  );
};

export default CustomCursor;
