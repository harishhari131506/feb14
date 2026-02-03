import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const smoothScroll = () => {
  const lenis = new Lenis({
    lerp: 0.08, // Gentle page-turning feel
    smoothWheel: true,
    smoothTouch: false, // Native on mobile as requested
    touchMultiplier: 2,
  })

  // Keep GSAP ScrollTrigger in sync with Lenis smooth scrolling
  lenis.on('scroll', ScrollTrigger.update)

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  // Ensure pin spacers / measurements are correct after Lenis attaches
  // (especially important for ScrollTrigger pin sections)
  requestAnimationFrame(() => ScrollTrigger.refresh())

  return lenis
}
