import Lenis from 'lenis'

export const smoothScroll = () => {
  const lenis = new Lenis({
    lerp: 0.08, // Gentle page-turning feel
    smoothWheel: true,
    smoothTouch: false, // Native on mobile as requested
    touchMultiplier: 2,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return lenis
}
