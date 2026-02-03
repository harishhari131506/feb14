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
  pinDuration = '+=200%', // Allow customization of the pin duration
}) => {
  const sceneRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sceneRef.current) return;

    const ctx = gsap.context(() => {
      const scene = sceneRef.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          pin: true,
          start: 'center center', // Pin when centered
          end: pinDuration,
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
    }, sceneRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, timeline, onEnter, onLeave, pinDuration]);

  return (
    <div ref={sceneRef} className={className}>
      {children}
    </div>
  );
};

export default PinnedScene;
