
import { useEffect, useState, useCallback, useRef } from 'react'
import Scene1 from './Scene1'
import Scene2 from './Scene2'
import Scene3 from './Scene3'

export const ScrollStory = () => {
  const [scene1Progress, setScene1Progress] = useState(0)
  const [scene2Progress, setScene2Progress] = useState(0)
  const [scene3Progress, setScene3Progress] = useState(0)

  const scene1Ref = useRef(null)
  const scene2Ref = useRef(null)
  const scene3Ref = useRef(null)

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight

    // Scene 1: 0-100vh (0-8% of scroll progress)
    if (scene1Ref.current) {
      const scene1Top = scene1Ref.current.offsetTop
      const scene1Progress = Math.min(Math.max((scrollY - scene1Top) / windowHeight, 0), 1)
      setScene1Progress(scene1Progress * 0.08) // Map to 0-8%
    }

    // Scene 2: 100vh-200vh (8-18% of scroll progress)
    if (scene2Ref.current) {
      const scene2Top = scene2Ref.current.offsetTop
      const scene2Progress = Math.min(Math.max((scrollY - scene2Top) / windowHeight, 0), 1)
      setScene2Progress(0.08 + scene2Progress * 0.10) // Map to 8-18%
    }

    // Scene 3: 200vh-300vh (18-30% of scroll progress)
    if (scene3Ref.current) {
      const scene3Top = scene3Ref.current.offsetTop
      const scene3Progress = Math.min(Math.max((scrollY - scene3Top) / windowHeight, 0), 1)
      setScene3Progress(0.18 + scene3Progress * 0.12) // Map to 18-30%
    }
  }, [])

  useEffect(() => {
    handleScroll() // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div className="relative">
      {/* Scene 1: The Pull (0-8%) - First 100vh */}
      <div ref={scene1Ref} className="relative w-full h-screen overflow-hidden">
        <Scene1 scrollProgress={scene1Progress} />

        {/* Debug info */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded text-xs font-mono z-50">
          Scene 1: {(scene1Progress * 100).toFixed(1)}%
        </div>
      </div>

      {/* Scene 2: The Shift (8-18%) - Second 100vh */}
      <div ref={scene2Ref} className="relative w-full h-screen overflow-hidden">
        <Scene2 scrollProgress={scene2Progress} />

        {/* Debug info */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded text-xs font-mono z-50">
          Scene 2: {(scene2Progress * 100).toFixed(1)}%
        </div>
      </div>

      {/* Scene 3: The Brightening (18-30%) - Third 100vh */}
      <div ref={scene3Ref} className="relative w-full h-screen overflow-hidden">
        <Scene3 scrollProgress={scene3Progress} />

        {/* Debug info */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded text-xs font-mono z-50">
          Scene 3: {(scene3Progress * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  )
}

export default ScrollStory
