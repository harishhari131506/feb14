import { useEffect, useRef, useState } from 'react';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import { Scene6 } from './scenes/Scene6';
import { Scene7 } from './scenes/Scene7';
import { Scene8 } from './scenes/Scene8';
import { Scene9 } from './scenes/Scene9';
import { Scene10 } from './scenes/Scene10';
import { Scene11 } from './scenes/Scene11';
import { Scene12 } from './scenes/Scene12';

// ... imports remain same ...

export const ScrollStory = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [autoAdvancing, setAutoAdvancing] = useState(false);
  const [currentScene, setCurrentScene] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // If paused/auto-advancing, we might want to prevent scroll or just ignore it.
      // But if we prevent scroll, we might fight the browser. 
      // Better to just not update progress if we are in "movie mode" (Scenes 10-12).
      if (isPaused || autoAdvancing) return;

      const container = containerRef.current;
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;

      setScrollProgress(progress);

      // Determine current scene
      if (progress < 8) setCurrentScene(1);
      else if (progress < 18) setCurrentScene(2);
      else if (progress < 30) setCurrentScene(3);
      else if (progress < 45) setCurrentScene(4);
      else if (progress < 58) setCurrentScene(5);
      else if (progress < 70) setCurrentScene(6);
      else if (progress < 82) setCurrentScene(7);
      else if (progress < 92) setCurrentScene(8);
      else if (progress < 98) setCurrentScene(9);
      else if (progress >= 98 && progress < 100) {
        setCurrentScene(10);

        // Forced pause at Screen 10
        if (!isPaused) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setAutoAdvancing(true);
            setCurrentScene(11);

            // After 8 seconds, move to Scene 12
            setTimeout(() => {
              setAutoAdvancing(false);
              setCurrentScene(12);
            }, 8000);
          }, 2000);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isPaused, autoAdvancing]);

  return (
    <div
      className="scroll-story-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      {/* 1. VISUALS LAYER */}
      {/* 
         This layer stays fixed visually (absolute to this wrapper).
         It sits BEHIND the scroll interaction layer usually, BUT Scene 12 needs interaction.
         So we place it on top, but use pointer-events: none for Scenes 1-11.
         Scene 12 will have pointer-events: auto.
      */}
      <div
        className="visuals-layer"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: currentScene === 12 ? 'auto' : 'none'
        }}
      >
        {/* DEBUG INDICATOR */}
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'red', color: 'white', padding: '10px', zIndex: 9999 }}>
          SCROLL STORY DEBUG: Scene {currentScene} | Progress {Math.round(scrollProgress)}%
        </div>

        {currentScene === 1 && <Scene1 progress={scrollProgress} />}
        {currentScene === 2 && <Scene2 progress={scrollProgress} />}
        {currentScene === 3 && <Scene3 progress={scrollProgress} />}
        {currentScene === 4 && <Scene4 progress={scrollProgress} />}
        {currentScene === 5 && <Scene5 progress={scrollProgress} />}
        {currentScene === 6 && <Scene6 progress={scrollProgress} />}
        {currentScene === 7 && <Scene7 progress={scrollProgress} />}
        {currentScene === 8 && <Scene8 progress={scrollProgress} />}
        {currentScene === 9 && <Scene9 progress={scrollProgress} />}
        {currentScene === 10 && <Scene10 progress={scrollProgress} />}
        {currentScene === 11 && <Scene11 />}
        {currentScene === 12 && <Scene12 />}
      </div>

      {/* 2. SCROLL INTERACTION LAYER */}
      <div
        ref={containerRef}
        className="scroll-container"
        data-lenis-prevent
        style={{
          position: 'absolute',
          inset: 0,
          overflowY: 'scroll',
          overflowX: 'hidden',
          zIndex: 20,
          // We need this to capture scroll, so pointer-events must be auto.
          // BUT if it covers the visual layer, visual layer can't be clicked (Scene 12).
          // Solution: 
          // If Scene 12, we can hide this layer or reduce z-index?
          // If Scene 12, we are at the end, maybe we don't need scroll anymore?
          // The script says Scene 12 is "Static".
          // So for Scene 12, we can effectively disable this layer's interaction or put it behind.
          zIndex: currentScene === 12 ? 5 : 20,
          scrollBehavior: isPaused ? 'auto' : 'smooth',
          overscrollBehavior: 'none'
        }}
      >
        <div style={{ height: '1200vh' }}>
          {/* Empty spacer just to create scroll height */}
        </div>
      </div>
    </div>
  );
};

export default ScrollStory;
