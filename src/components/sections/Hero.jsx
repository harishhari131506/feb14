import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { easings } from '../../utils/easings';
import { LiquidMorphingText } from '../animations/MorphingText';
import soundManager from '../../utils/soundEffects';

const withBase = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, '')}`;

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [countValue, setCountValue] = useState(0);

  // Stable counter value (no RAF loops)
  useEffect(() => {
    setCountValue(12847);
  }, [prefersReducedMotion]);

  return (
    <section className="relative w-full min-h-[100dvh] bg-[#FDFBF7] flex flex-col items-center justify-center overflow-hidden">
      {/* Minimal, precise background with subtle motion */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Strong romantic animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-warm-beige/60 via-cream to-white" />
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage:
                'radial-gradient(900px 500px at 20% 20%, rgba(220, 38, 127, 0.25), transparent 60%), radial-gradient(800px 520px at 80% 30%, rgba(217, 119, 6, 0.18), transparent 60%), radial-gradient(900px 600px at 50% 85%, rgba(244, 63, 94, 0.14), transparent 65%)',
            }}
            animate={{
              filter: ['blur(0px) saturate(110%)', 'blur(1px) saturate(130%)', 'blur(0px) saturate(110%)'],
              opacity: [0.75, 0.95, 0.75],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Slow, drifting light blobs (Awwwards-style, but restrained) */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-rose-gold/12 blur-3xl"
              animate={{
                x: ['-50%', '-45%', '-50%'],
                y: [-10, 14, -10],
                scale: [1, 1.05, 1],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              style={{ left: '50%' }}
            />
            <motion.div
              className="absolute -bottom-40 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-muted-red/10 blur-3xl"
              animate={{
                x: ['-50%', '-55%', '-50%'],
                y: [16, -8, 16],
                scale: [1, 1.06, 1],
                opacity: [0.8, 0.95, 0.8],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
              style={{ left: '50%' }}
            />
            <motion.div
              className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-gold/10 blur-3xl"
              animate={{
                x: [0, 40, 0],
                y: [0, -20, 0],
                scale: [1, 1.04, 1],
                opacity: [0.55, 0.75, 0.55],
              }}
              transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        {/* Floating hearts (lightweight, very visible) */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 overflow-hidden">
            {[
              { left: '12%', size: 18, delay: 0.2, duration: 9, opacity: 0.22 },
              { left: '26%', size: 14, delay: 1.1, duration: 8, opacity: 0.18 },
              { left: '44%', size: 20, delay: 0.6, duration: 10, opacity: 0.20 },
              { left: '63%', size: 16, delay: 1.7, duration: 8.5, opacity: 0.17 },
              { left: '78%', size: 22, delay: 0.9, duration: 11, opacity: 0.19 },
              { left: '88%', size: 13, delay: 2.2, duration: 7.8, opacity: 0.14 },
            ].map((h, i) => (
              <motion.img
                key={i}
                src={withBase('heart.svg')}
                alt=""
                className="absolute bottom-[-40px]"
                style={{
                  left: h.left,
                  width: h.size,
                  height: h.size,
                  opacity: h.opacity,
                  filter: 'drop-shadow(0 10px 25px rgba(220, 38, 127, 0.22))',
                }}
                animate={{
                  y: [-10, -880],
                  x: [0, i % 2 === 0 ? 18 : -18, 0],
                  rotate: [0, i % 2 === 0 ? 10 : -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: h.duration,
                  delay: h.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}

        {/* Gentle grain for texture */}
        {!prefersReducedMotion && (
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            }}
          />
        )}
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 text-center flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: easings.elegant }}
          className="font-playfair text-4xl md:text-6xl lg:text-7xl text-soft-black leading-tight mb-6"
        >
          Your Love Story, Told{' '}
          <span className="inline-block text-muted-red">
            <LiquidMorphingText
              words={['Beautifully', 'Elegantly', 'Perfectly']}
              duration={4500}
              className="inline-block"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.15, duration: 0.9, ease: 'easeOut' }}
          className="font-inter font-light text-gray-500 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
        >
          Create a digital love letter they'll treasure forever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: easings.elegant }}
          className="pt-4"
        >
          <Button
            variant="primary"
            className="text-white"
            magnetic={true}
            onClick={() => {
              soundManager.playHeartbeat();
              document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Begin Your Message
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: 'easeOut' }}
          className="mt-6 text-sm text-gray-500 font-inter tracking-wide"
        >
          Join <span className="font-semibold text-muted-red">{countValue.toLocaleString()}</span> people sharing their love
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
