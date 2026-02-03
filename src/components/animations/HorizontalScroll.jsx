import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Horizontal Scroll Section - Awwwards signature pattern
 * Scroll down, content moves sideways (like a timeline)
 */
const HorizontalScroll = ({ children, snap = true }) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !wrapperRef.current) return;

    // IMPORTANT: never kill global ScrollTriggers from here.
    // Use gsap.context() so cleanup only affects what we create.
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const wrapper = wrapperRef.current;
      const sections = Array.from(wrapper.children);
      const sectionCount = sections.length;

      const setup = () => {
        // Measure after layout (avoid 0 widths)
        const totalWidth = sections.reduce((sum, section) => sum + section.offsetWidth, 0);
        const maxX = Math.max(0, totalWidth - container.offsetWidth);

        // If there is no horizontal travel, don't pin/animate:
        // - Pinning with end=0 can create a "blank" pinned screen
        // - Our per-section gsap.fromTo would leave opacity at 0 (immediateRender)
        if (maxX <= 1) {
          wrapper.style.width = '100%';
          gsap.set(wrapper, { x: 0, clearProps: 'transform' });
          sections.forEach((section) => {
            const content = section.querySelector('.horizontal-content');
            if (!content) return;
            gsap.set(content, { opacity: 1, scale: 1, y: 0, clearProps: 'transform' });
          });
          // Still refresh so other ScrollTriggers measure correctly.
          ScrollTrigger.refresh();
          return;
        }

        wrapper.style.width = `${totalWidth}px`;

        // Horizontal scroll animation
        const scrollTween = gsap.to(wrapper, {
          x: -maxX,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            pin: true,
            // Works reliably even when an ancestor has transform/clip-path
            // (e.g. framer-motion page transitions), where fixed-position pinning can appear blank/clipped.
            pinType: 'transform',
            scrub: 1,
            snap: snap && sectionCount > 1 ? {
              snapTo: 1 / (sectionCount - 1),
              duration: { min: 0.2, max: 0.6 },
              delay: 0.2,
            } : false,
            start: 'top top',
            // End should match horizontal travel distance (not total width)
            end: () => `+=${maxX}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Individual section animations (tied to containerAnimation)
        sections.forEach((section) => {
          const content = section.querySelector('.horizontal-content');
          if (!content) return;

          gsap.fromTo(
            content,
            { opacity: 0, scale: 0.8, y: 50 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              immediateRender: false,
              scrollTrigger: {
                trigger: section,
                containerAnimation: scrollTween,
                start: 'left center',
                end: 'right center',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      };

      setup();

      // Re-measure on refresh/resize
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, snap]);

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className="w-full overflow-x-auto">
        <div ref={wrapperRef} className="flex">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-hidden"
    >
      <div
        ref={wrapperRef}
        className="flex h-full"
        style={{ willChange: 'transform' }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="horizontal-section flex-shrink-0 w-screen h-full flex items-center justify-center"
          >
            <div className="horizontal-content w-full max-w-7xl mx-auto px-6">
              {child}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
