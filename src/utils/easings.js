/**
 * Custom easing curves for elegant animations
 * Inspired by Material Design and Apple's motion principles
 */

export const easings = {
  // Elegant ease-out (like opening a letter)
  elegant: [0.16, 1, 0.3, 1],
  
  // Smooth spring-like
  smooth: [0.22, 1, 0.36, 1],
  
  // Bouncy but controlled
  bouncy: [0.68, -0.55, 0.265, 1.55],
  
  // Elastic entrance
  elastic: [0.68, -0.6, 0.32, 1.6],
  
  // Gentle ease
  gentle: [0.4, 0, 0.2, 1],
  
  // Sharp ease-out
  sharp: [0.4, 0, 0.6, 1],
  
  // Smooth ease-in-out
  smoothInOut: [0.4, 0, 0.2, 1],
};

/**
 * Animation duration constants
 */
export const durations = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  slower: 1.5,
  slowest: 2.0,
};

/**
 * Stagger delays for sequential animations
 */
export const stagger = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
};
