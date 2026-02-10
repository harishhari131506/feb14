import { useEffect, useState, useCallback, useRef } from 'react'
import Scene1 from './Scene1'
import Scene2 from './Scene2'
import Scene3 from './Scene3'

export const ScrollStory = () => {
  const [scene1Progress, setScene1Progress] = useState(0)
  const [scene2Progress, setScene2Progress] = useState(0)
  const [scene3Progress, setScene3Progress] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const scrollContainerRef = useRef(null)

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return

    const scrollY = scrollContainerRef.current.scrollTop
    const containerHeight = scrollContainerRef.current.clientHeight

    // Total scroll distance - 2x container height for smooth progression
    const totalScrollHeight = containerHeight * 2
    const progress = Math.min(scrollY / totalScrollHeight, 1)
    setScrollProgress(progress)

    // Calculate which scene and its progress
    if (progress < 0.333) {
      // Scene 1 (0-33%)
      const localProgress = progress / 0.333
      setScene1Progress(localProgress * 0.08)
    } else if (progress < 0.666) {
      // Scene 2 (33-66%)
      const localProgress = (progress - 0.333) / 0.333
      setScene2Progress(0.08 + localProgress * 0.10)
    } else {
      // Scene 3 (66-100%)
      const localProgress = (progress - 0.666) / 0.334
      setScene3Progress(0.18 + localProgress * 0.12)
    }
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    handleScroll()
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Calculate horizontal position
  const getHorizontalPosition = () => {
    return -scrollProgress * 200
  }

  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-screen overflow-y-scroll overflow-x-hidden bg-black"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* Hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Fixed viewport container - sticks to top of scroll container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Horizontal scrolling container */}
        <div
          className="absolute top-0 left-0 h-screen flex will-change-transform"
          style={{
            width: '300vw',
            transform: `translateX(${getHorizontalPosition()}vw)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Scene 1 */}
          <div className="relative w-screen h-screen flex-shrink-0">
            <Scene1 scrollProgress={scene1Progress} />

            <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-mono z-50 backdrop-blur-sm">
              <div>Scene 1: {(scene1Progress * 100).toFixed(1)}%</div>
              <div className="text-xs opacity-60 mt-1">Position: {(scrollProgress * 100).toFixed(0)}%</div>
            </div>
          </div>

          {/* Scene 2 */}
          <div className="relative w-screen h-screen flex-shrink-0">
            <Scene2 scrollProgress={scene2Progress} />

            <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-mono z-50 backdrop-blur-sm">
              <div>Scene 2: {(scene2Progress * 100).toFixed(1)}%</div>
              <div className="text-xs opacity-60 mt-1">Position: {(scrollProgress * 100).toFixed(0)}%</div>
            </div>
          </div>

          {/* Scene 3 */}
          <div className="relative w-screen h-screen flex-shrink-0">
            <Scene3 scrollProgress={scene3Progress} />

            <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-mono z-50 backdrop-blur-sm">
              <div>Scene 3: {(scene3Progress * 100).toFixed(1)}%</div>
              <div className="text-xs opacity-60 mt-1">Position: {(scrollProgress * 100).toFixed(0)}%</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-sm font-mono z-50 backdrop-blur-sm flex items-center gap-3">
          <div className="text-xs opacity-60">Scroll ↓</div>
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-100"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <div>{(scrollProgress * 100).toFixed(0)}%</div>
        </div>
      </div>

      {/* Internal spacer - creates scroll space within container */}
      <div className="h-[200vh]" aria-hidden="true" />
    </div>
  )
}

export default ScrollStory
// import { useEffect, useState, useCallback, useRef } from 'react'
// import Scene1 from './Scene1'
// import Scene2 from './Scene2'
// import Scene3 from './Scene3'

// export const ScrollStory = () => {
//   const [scene1Progress, setScene1Progress] = useState(0)
//   const [scene2Progress, setScene2Progress] = useState(0)
//   const [scene3Progress, setScene3Progress] = useState(0)
//   const [scrollProgress, setScrollProgress] = useState(0)

//   const containerRef = useRef(null)

//   const handleScroll = useCallback(() => {
//     const scrollY = window.scrollY
//     const windowHeight = window.innerHeight

//     // Total scroll distance for 3 scenes
//     const totalScrollHeight = windowHeight * 3
//     const progress = Math.min(scrollY / totalScrollHeight, 1)
//     setScrollProgress(progress)

//     // Calculate which scene and its progress
//     if (progress < 0.333) {
//       // Scene 1 (0-33%)
//       const localProgress = progress / 0.333
//       setScene1Progress(localProgress * 0.08)
//     } else if (progress < 0.666) {
//       // Scene 2 (33-66%)
//       const localProgress = (progress - 0.333) / 0.333
//       setScene2Progress(0.08 + localProgress * 0.10)
//     } else {
//       // Scene 3 (66-100%)
//       const localProgress = (progress - 0.666) / 0.334
//       setScene3Progress(0.18 + localProgress * 0.12)
//     }
//   }, [])

//   useEffect(() => {
//     handleScroll()
//     window.addEventListener('scroll', handleScroll, { passive: true })
//     window.addEventListener('resize', handleScroll, { passive: true })
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//       window.removeEventListener('resize', handleScroll)
//     }
//   }, [handleScroll])

//   // Calculate horizontal position (0 = right, 100 = left)
//   const getHorizontalPosition = () => {
//     // Moves from 0% (all scenes off to the right) to -200% (scenes moved left)
//     return -scrollProgress * 200
//   }

//   return (
//     <div className="relative bg-black overflow-hidden">
//       {/* Fixed viewport container */}
//       <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
//         {/* Horizontal scrolling container */}
//         <div
//           className="absolute top-0 left-0 h-screen flex transition-transform duration-100 ease-out"
//           style={{
//             width: '300vw', // 3 scenes × 100vw each
//             transform: `translateX(${getHorizontalPosition()}vw)`
//           }}
//         >
//           {/* Scene 1 */}
//           <div className="relative w-screen h-screen flex-shrink-0">
//             <Scene1 scrollProgress={scene1Progress} />

//             <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-mono z-50 backdrop-blur-sm">
//               <div>Scene 1: {(scene1Progress * 100).toFixed(1)}%</div>
//               <div className="text-xs opacity-60 mt-1">Position: {(scrollProgress * 100).toFixed(0)}%</div>
//             </div>
//           </div>

//           {/* Scene 2 */}
//           <div className="relative w-screen h-screen flex-shrink-0">
//             <Scene2 scrollProgress={scene2Progress} />

//             <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-mono z-50 backdrop-blur-sm">
//               <div>Scene 2: {(scene2Progress * 100).toFixed(1)}%</div>
//               <div className="text-xs opacity-60 mt-1">Position: {(scrollProgress * 100).toFixed(0)}%</div>
//             </div>
//           </div>

//           {/* Scene 3 */}
//           <div className="relative w-screen h-screen flex-shrink-0">
//             <Scene3 scrollProgress={scene3Progress} />

//             <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-mono z-50 backdrop-blur-sm">
//               <div>Scene 3: {(scene3Progress * 100).toFixed(1)}%</div>
//               <div className="text-xs opacity-60 mt-1">Position: {(scrollProgress * 100).toFixed(0)}%</div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-sm font-mono z-50 backdrop-blur-sm flex items-center gap-3">
//           <div className="text-xs opacity-60">Scroll Down ↓</div>
//           <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-white rounded-full transition-all duration-100"
//               style={{ width: `${scrollProgress * 100}%` }}
//             />
//           </div>
//           <div>{(scrollProgress * 100).toFixed(0)}%</div>
//         </div>
//       </div>

//       {/* Spacer for vertical scrolling - 3x viewport height */}
//       <div className="h-[300vh]" aria-hidden="true" />
//     </div>
//   )
// }

// export default ScrollStory

// ===================================================================================
// import { useEffect, useState, useCallback, useRef } from 'react'
// import Scene1 from './Scene1'
// import Scene2 from './Scene2'
// import Scene3 from './Scene3'

// export const ScrollStory = () => {
//   const [scene1Progress, setScene1Progress] = useState(0)
//   const [scene2Progress, setScene2Progress] = useState(0)
//   const [scene3Progress, setScene3Progress] = useState(0)
//   const [globalScroll, setGlobalScroll] = useState(0)

//   const containerRef = useRef(null)
//   const scene1Ref = useRef(null)
//   const scene2Ref = useRef(null)
//   const scene3Ref = useRef(null)

//   const handleScroll = useCallback(() => {
//     const scrollY = window.scrollY
//     const windowHeight = window.innerHeight

//     // Global scroll progress (0 to 1 across all scenes)
//     const totalHeight = windowHeight * 3
//     const globalProgress = Math.min(scrollY / totalHeight, 1)
//     setGlobalScroll(globalProgress)

//     // Scene 1: 0vh to 100vh (0-8% of story)
//     const scene1Start = 0
//     const scene1End = windowHeight
//     const scene1ScrollProgress = Math.min(Math.max((scrollY - scene1Start) / windowHeight, 0), 1)
//     setScene1Progress(scene1ScrollProgress * 0.08)

//     // Scene 2: 100vh to 200vh (8-18% of story)
//     const scene2Start = windowHeight
//     const scene2End = windowHeight * 2
//     const scene2ScrollProgress = Math.min(Math.max((scrollY - scene2Start) / windowHeight, 0), 1)
//     setScene2Progress(0.08 + scene2ScrollProgress * 0.10)

//     // Scene 3: 200vh to 300vh (18-30% of story)
//     const scene3Start = windowHeight * 2
//     const scene3End = windowHeight * 3
//     const scene3ScrollProgress = Math.min(Math.max((scrollY - scene3Start) / windowHeight, 0), 1)
//     setScene3Progress(0.18 + scene3ScrollProgress * 0.12)
//   }, [])

//   useEffect(() => {
//     handleScroll()
//     window.addEventListener('scroll', handleScroll, { passive: true })
//     window.addEventListener('resize', handleScroll, { passive: true })
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//       window.removeEventListener('resize', handleScroll)
//     }
//   }, [handleScroll])

//   // Calculate opacity for smooth transitions
//   const getSceneOpacity = (sceneIndex) => {
//     const scrollY = window.scrollY
//     const windowHeight = window.innerHeight
//     const sceneStart = windowHeight * sceneIndex
//     const fadeDistance = windowHeight * 0.3 // 30% of viewport for fade

//     // Fade in
//     const fadeInProgress = Math.min(Math.max((scrollY - sceneStart) / fadeDistance, 0), 1)

//     // Fade out
//     const fadeOutStart = sceneStart + windowHeight - fadeDistance
//     const fadeOutProgress = Math.min(Math.max((scrollY - fadeOutStart) / fadeDistance, 0), 1)

//     return Math.min(fadeInProgress, 1 - fadeOutProgress)
//   }

//   return (
//     <div ref={containerRef} className="relative bg-black">
//       {/* Scene 1: The Pull (0-8%) */}
//       <div
//         ref={scene1Ref}
//         className="sticky top-0 w-full h-screen overflow-hidden"
//         style={{
//           opacity: getSceneOpacity(0),
//           transition: 'opacity 0.1s ease-out'
//         }}
//       >
//         <Scene1 scrollProgress={scene1Progress} />

//         {/* Debug info */}
//         <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-mono z-50 backdrop-blur-sm">
//           <div>Scene 1: {(scene1Progress * 100).toFixed(1)}%</div>
//           <div className="text-xs opacity-60 mt-1">Scroll: {(globalScroll * 100).toFixed(0)}%</div>
//         </div>
//       </div>

//       {/* Scene 2: The Shift (8-18%) */}
//       <div
//         ref={scene2Ref}
//         className="sticky top-0 w-full h-screen overflow-hidden"
//         style={{
//           opacity: getSceneOpacity(1),
//           transition: 'opacity 0.1s ease-out'
//         }}
//       >
//         <Scene2 scrollProgress={scene2Progress} />

//         {/* Debug info */}
//         <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-mono z-50 backdrop-blur-sm">
//           <div>Scene 2: {(scene2Progress * 100).toFixed(1)}%</div>
//           <div className="text-xs opacity-60 mt-1">Scroll: {(globalScroll * 100).toFixed(0)}%</div>
//         </div>
//       </div>

//       {/* Scene 3: The Brightening (18-30%) */}
//       <div
//         ref={scene3Ref}
//         className="sticky top-0 w-full h-screen overflow-hidden"
//         style={{
//           opacity: getSceneOpacity(2),
//           transition: 'opacity 0.1s ease-out'
//         }}
//       >
//         <Scene3 scrollProgress={scene3Progress} />

//         {/* Debug info */}
//         <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-mono z-50 backdrop-blur-sm">
//           <div>Scene 3: {(scene3Progress * 100).toFixed(1)}%</div>
//           <div className="text-xs opacity-60 mt-1">Scroll: {(globalScroll * 100).toFixed(0)}%</div>
//         </div>
//       </div>

//       {/* Spacer to enable scrolling through all scenes */}
//       <div className="h-[200vh]" aria-hidden="true" />
//     </div>
//   )
// }

// export default ScrollStory


// import { useEffect, useState, useCallback, useRef } from 'react'
// import Scene1 from './Scene1'
// import Scene2 from './Scene2'
// import Scene3 from './Scene3'

// export const ScrollStory = () => {
//   const [scene1Progress, setScene1Progress] = useState(0)
//   const [scene2Progress, setScene2Progress] = useState(0)
//   const [scene3Progress, setScene3Progress] = useState(0)

//   const scene1Ref = useRef(null)
//   const scene2Ref = useRef(null)
//   const scene3Ref = useRef(null)

//   const handleScroll = useCallback(() => {
//     const scrollY = window.scrollY
//     const windowHeight = window.innerHeight

//     // Scene 1: 0-100vh (0-8% of scroll progress)
//     if (scene1Ref.current) {
//       const scene1Top = scene1Ref.current.offsetTop
//       const scene1Progress = Math.min(Math.max((scrollY - scene1Top) / windowHeight, 0), 1)
//       setScene1Progress(scene1Progress * 0.08) // Map to 0-8%
//     }

//     // Scene 2: 100vh-200vh (8-18% of scroll progress)
//     if (scene2Ref.current) {
//       const scene2Top = scene2Ref.current.offsetTop
//       const scene2Progress = Math.min(Math.max((scrollY - scene2Top) / windowHeight, 0), 1)
//       setScene2Progress(0.08 + scene2Progress * 0.10) // Map to 8-18%
//     }

//     // Scene 3: 200vh-300vh (18-30% of scroll progress)
//     if (scene3Ref.current) {
//       const scene3Top = scene3Ref.current.offsetTop
//       const scene3Progress = Math.min(Math.max((scrollY - scene3Top) / windowHeight, 0), 1)
//       setScene3Progress(0.18 + scene3Progress * 0.12) // Map to 18-30%
//     }
//   }, [])

//   useEffect(() => {
//     handleScroll() // Initial call
//     window.addEventListener('scroll', handleScroll, { passive: true })
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [handleScroll])

//   return (
//     <div className="relative">
//       {/* Scene 1: The Pull (0-8%) - First 100vh */}
//       <div ref={scene1Ref} className="relative w-full h-screen overflow-hidden">
//         <Scene1 scrollProgress={scene1Progress} />

//         {/* Debug info */}
//         <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded text-xs font-mono z-50">
//           Scene 1: {(scene1Progress * 100).toFixed(1)}%
//         </div>
//       </div>

//       {/* Scene 2: The Shift (8-18%) - Second 100vh */}
//       <div ref={scene2Ref} className="relative w-full h-screen overflow-hidden">
//         <Scene2 scrollProgress={scene2Progress} />

//         {/* Debug info */}
//         <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded text-xs font-mono z-50">
//           Scene 2: {(scene2Progress * 100).toFixed(1)}%
//         </div>
//       </div>

//       {/* Scene 3: The Brightening (18-30%) - Third 100vh */}
//       <div ref={scene3Ref} className="relative w-full h-screen overflow-hidden">
//         <Scene3 scrollProgress={scene3Progress} />

//         {/* Debug info */}
//         <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded text-xs font-mono z-50">
//           Scene 3: {(scene3Progress * 100).toFixed(1)}%
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ScrollStory