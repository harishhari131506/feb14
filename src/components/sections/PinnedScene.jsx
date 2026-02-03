import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned Scene with Internal Timeline
 * Section pins while internal animations play out
 * Classic Awwwards pattern
 */
const PinnedScene = ({ 
  children, 
  className = '',
  timeline = [],
  onEnter,
  onLeave,
}) => {
  const sceneRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sceneRef.current) return;

    const scene = sceneRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        pin: true,
        start: 'top top',
        end: '+=200%', // Pin for 2x viewport height
        scrub: 1,
        anticipatePin: 1,
        onEnter: () => {
          if (onEnter) onEnter();
        },
        onLeave: () => {
          if (onLeave) onLeave();
        },
      },
    });

    // Add timeline animations
    timeline.forEach(({ selector, props, position }) => {
      const elements = scene.querySelectorAll(selector);
      elements.forEach((el) => {
        tl.fromTo(el, props.from || {}, props.to || {}, position);
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === scene) {
          trigger.kill();
        }
      });
    };
  }, [prefersReducedMotion, timeline, onEnter, onLeave]);

  return (
    <div ref={sceneRef} className={className}>
      {children}
    </div>
  );
};

export default PinnedScene;
