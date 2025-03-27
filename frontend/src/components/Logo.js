import { useState, useEffect } from 'react';
import '../styles/logo.css';

const Logo = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Toggle animation on hover
  const handleMouseEnter = () => {
    setIsAnimating(true);
  };
  
  const handleMouseLeave = () => {
    setIsAnimating(false);
  };
  
  // Random animation on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      
      const resetTimer = setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
      
      return () => clearTimeout(resetTimer);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`logo-container ${isAnimating ? 'animate' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="logo-cube">
        <div className="face front">T</div>
        <div className="face back">M</div>
        <div className="face right">A</div>
        <div className="face left">S</div>
        <div className="face top">K</div>
        <div className="face bottom">S</div>
      </div>
      <span className="logo-text">Task Manager</span>
    </div>
  );
};

export default Logo; 