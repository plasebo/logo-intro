import React, { useState, useEffect } from 'react';
import { useNeonCursor } from '../hooks/useNeonCursor';
import styled from 'styled-components';
import Confetti from 'react-confetti';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  overflow: hidden;
  position: absolute;
  cursor: none;
  top: 0;
  left: 0;
  z-index: 2;
`;

const Link = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
  z-index: 4;

  &:hover {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const LogosContainer = styled.div`
  width: 800px;
  height: 800px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  z-index: 3;
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;


const LogoAnimation: React.FC = () => {
  const [mouseX, setMouseX] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useNeonCursor();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      setMouseX(x);
      
      if (x / window.innerWidth >= 0.8) {
        setShowConfetti(true);
      } else {
        setShowConfetti(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const progress = mouseX / windowWidth;
  const dividerPosition = progress * 888;

  return (
    <>
      <Container id='app'>
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={true}
            numberOfPieces={250}
            gravity={0.25}
            wind={0.05}
          />
        )}
        <LogosContainer>
          <LogoWrapper style={{ height: `280px`, marginTop: `50%`, translate: `0 -50%` }}>
            <img 
              src="https://cdn.jsdelivr.net/gh/mnsltd/mns-public@develop/logo.png"
              alt="Old Logo" 
              width="80%"
            />
          </LogoWrapper>
          <LogoWrapper style={{ backgroundColor: `#000`, height: `280px`, marginTop: `50%`, translate: `0 -50%`, clipPath: `inset(0 ${800 - dividerPosition}px 0 0)` }}>
            <img 
              src="https://cdn.jsdelivr.net/gh/mnsltd/mns-public@develop/brand/logo.png" 
              alt="New Logo"
              width="100%"
            />
          </LogoWrapper>
        </LogosContainer>
        {showConfetti && (
          <Link href="https://mns-logo-anim.netlify.app/" target="_blank" rel="noopener noreferrer">
            Go to anim
          </Link>
        )}
      </Container>
    </>
  );
};

export default LogoAnimation; 