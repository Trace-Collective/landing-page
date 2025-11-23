/**
 * TRACE COLLECTIVE - STANDALONE LOADING SCREEN
 * 
 * Neo-Brutalist Loading Screen with Boiling Logo Effect & Glitch Transition
 * 
 * FEATURES:
 * - Frame-by-frame animated logo (boiling effect)
 * - Terminal code animation
 * - Progress bar with rough line texture
 * - Glitch transition at 100%
 * - Self-contained with all animations
 * 
 * DEPENDENCIES:
 * - motion/react (framer-motion)
 * - React
 * 
 * USAGE:
 * import { LoadingScreenStandalone } from './components/LoadingScreenStandalone';
 * 
 * <LoadingScreenStandalone 
 *   onComplete={() => console.log('Loading complete!')}
 *   logoUrl="/path/to/your/logo.png"
 *   duration={2000} // optional: loading duration in ms
 * />
 */

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenStandaloneProps {
  onComplete: () => void;
  logoUrl?: string;
  duration?: number; // Duration in milliseconds
  backgroundColor?: string;
  textColor?: string;
}

export function LoadingScreenStandalone({
  onComplete,
  logoUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80", // Default placeholder
  duration = 2000,
  backgroundColor = "#000000",
  textColor = "#F0F0F0",
}: LoadingScreenStandaloneProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const incrementValue = 100 / (duration / 20); // Calculate increment based on duration
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500); // Delay before calling onComplete
          return 100;
        }
        return Math.min(prev + incrementValue, 100);
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete, duration]);

  return (
    <motion.div
      className="loading-screen-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: textColor,
        fontFamily: "'Space Mono', 'Courier New', monospace",
      }}
    >
      {/* INLINE STYLES */}
      <style>{`
        @keyframes boil {
          0%, 100% {
            filter: url(#turbulence-0);
          }
          25% {
            filter: url(#turbulence-1);
          }
          50% {
            filter: url(#turbulence-2);
          }
          75% {
            filter: url(#turbulence-3);
          }
        }

        @keyframes glitch {
          0% {
            clip-path: inset(40% 0 61% 0);
            transform: translate(0, 0);
          }
          20% {
            clip-path: inset(92% 0 1% 0);
            transform: translate(-2px, 2px);
          }
          40% {
            clip-path: inset(43% 0 1% 0);
            transform: translate(2px, -2px);
          }
          60% {
            clip-path: inset(25% 0 58% 0);
            transform: translate(-2px, 2px);
          }
          80% {
            clip-path: inset(54% 0 7% 0);
            transform: translate(2px, -2px);
          }
          100% {
            clip-path: inset(58% 0 43% 0);
            transform: translate(0, 0);
          }
        }

        .boiling-logo {
          animation: boil 0.6s infinite;
        }

        .glitch-layer {
          animation: glitch 0.3s infinite;
          mix-blend-mode: screen;
          opacity: 0.7;
        }

        .glitch-layer-reverse {
          animation: glitch 0.4s infinite reverse;
          mix-blend-mode: screen;
          opacity: 0.5;
          filter: hue-rotate(180deg);
        }

        @keyframes terminalBlink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        .terminal-cursor {
          animation: terminalBlink 1s infinite;
        }

        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>

      {/* SVG FILTERS FOR BOILING EFFECT */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="turbulence-0">
            <feTurbulence baseFrequency="0.01 0.01" numOctaves="1" seed="0" />
            <feDisplacementMap in="SourceGraphic" scale="2" />
          </filter>
          <filter id="turbulence-1">
            <feTurbulence baseFrequency="0.01 0.01" numOctaves="1" seed="1" />
            <feDisplacementMap in="SourceGraphic" scale="3" />
          </filter>
          <filter id="turbulence-2">
            <feTurbulence baseFrequency="0.01 0.01" numOctaves="1" seed="2" />
            <feDisplacementMap in="SourceGraphic" scale="2.5" />
          </filter>
          <filter id="turbulence-3">
            <feTurbulence baseFrequency="0.01 0.01" numOctaves="1" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="2.2" />
          </filter>
        </defs>
      </svg>

      {/* ANIMATED LOGO WITH BOILING EFFECT */}
      <motion.div
        style={{
          position: 'relative',
          marginBottom: '3rem',
          width: '192px',
          height: '192px',
        }}
        animate={{
          scale: [1, 1.02, 0.98, 1.01, 1],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {/* Main Logo with Boiling Effect */}
        <img
          src={logoUrl}
          alt="Loading"
          className="boiling-logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'url(#turbulence-0)',
          }}
        />
        
        {/* Glitch Layers (appear after 50% progress) */}
        {progress > 50 && (
          <>
            <img
              src={logoUrl}
              alt=""
              className="glitch-layer"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
            <img
              src={logoUrl}
              alt=""
              className="glitch-layer-reverse"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </>
        )}
      </motion.div>

      {/* TERMINAL CODE EFFECT */}
      <div style={{
        fontFamily: "'Space Mono', 'Courier New', monospace",
        fontSize: '0.75rem',
        color: textColor,
        opacity: 0.5,
        marginBottom: '2rem',
        overflow: 'hidden',
        height: '4rem',
        textAlign: 'left',
        minWidth: '320px',
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div style={{ marginBottom: '0.25rem' }}>
            {'> INITIALIZING TRACE_COLLECTIVE.CORE'}
          </div>
          <div style={{ marginBottom: '0.25rem' }}>
            {'> LOADING ASSETS... [OK]'}
          </div>
          <div style={{ marginBottom: '0.25rem' }}>
            {'> COMPILING 3D_RENDERER... [OK]'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {'> ESTABLISHING CONNECTION'}
            <span className="terminal-cursor">_</span>
          </div>
        </motion.div>
      </div>

      {/* PROGRESS BAR */}
      <div style={{
        width: '16rem',
        height: '4px',
        backgroundColor: '#1a1a1a',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <motion.div
          style={{
            height: '100%',
            backgroundColor: textColor,
            position: 'relative',
            width: `${progress}%`,
          }}
        >
          {/* Rough Line Effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.3,
            display: 'flex',
          }}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: 0,
                  height: '100%',
                  width: '1px',
                  backgroundColor: '#000000',
                  left: `${i * 5}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* PROGRESS PERCENTAGE */}
      <div style={{
        fontFamily: "'Space Mono', 'Courier New', monospace",
        fontSize: '0.875rem',
        color: textColor,
        marginTop: '1rem',
        letterSpacing: '0.1em',
      }}>
        {Math.floor(progress).toString().padStart(3, '0')}%
      </div>

      {/* SYSTEM INFO */}
      <motion.div
        style={{
          fontFamily: "'Space Mono', 'Courier New', monospace",
          fontSize: '0.625rem',
          color: textColor,
          opacity: 0.3,
          marginTop: '2rem',
          textAlign: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5 }}
      >
        <div>TRACE_COLLECTIVE v1.0.0</div>
        <div style={{ marginTop: '0.25rem' }}>
          BUILD_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
        </div>
      </motion.div>

      {/* GLITCH SCREEN EFFECT AT 100% */}
      {progress === 100 && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'white',
            mixBlendMode: 'difference',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0, 1, 0, 1, 0],
            scaleX: [1, 0.8, 1, 0.9, 1],
          }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* DECORATIVE CORNER BRACKETS */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        width: '40px',
        height: '40px',
        borderTop: `2px solid ${textColor}`,
        borderLeft: `2px solid ${textColor}`,
        opacity: 0.3,
      }} />
      <div style={{
        position: 'absolute',
        top: '2rem',
        right: '2rem',
        width: '40px',
        height: '40px',
        borderTop: `2px solid ${textColor}`,
        borderRight: `2px solid ${textColor}`,
        opacity: 0.3,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '2rem',
        width: '40px',
        height: '40px',
        borderBottom: `2px solid ${textColor}`,
        borderLeft: `2px solid ${textColor}`,
        opacity: 0.3,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        right: '2rem',
        width: '40px',
        height: '40px',
        borderBottom: `2px solid ${textColor}`,
        borderRight: `2px solid ${textColor}`,
        opacity: 0.3,
      }} />

      {/* GRID OVERLAY */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, ${textColor}22 1px, transparent 1px),
          linear-gradient(to bottom, ${textColor}22 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.1,
        pointerEvents: 'none',
      }} />

      {/* SCAN LINE EFFECT */}
      {progress > 30 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '30%',
              background: `linear-gradient(to bottom, transparent, ${textColor}33, transparent)`,
              top: '-30%',
            }}
            animate={{
              top: ['-30%', '130%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      )}
    </motion.div>
  );
}

/**
 * INSTALLATION INSTRUCTIONS:
 * 
 * 1. Install dependencies:
 *    npm install motion
 *    or
 *    yarn add motion
 * 
 * 2. Import the component:
 *    import { LoadingScreenStandalone } from './components/LoadingScreenStandalone';
 * 
 * 3. Use in your app:
 *    const [isLoading, setIsLoading] = useState(true);
 * 
 *    return (
 *      <>
 *        {isLoading && (
 *          <LoadingScreenStandalone
 *            onComplete={() => setIsLoading(false)}
 *            logoUrl="/your-logo.png"
 *            duration={2000}
 *            backgroundColor="#000000"
 *            textColor="#F0F0F0"
 *          />
 *        )}
 *        <YourMainContent />
 *      </>
 *    );
 * 
 * CUSTOMIZATION OPTIONS:
 * - logoUrl: Your logo image path
 * - duration: Loading duration in milliseconds (default: 2000)
 * - backgroundColor: Background color (default: "#000000")
 * - textColor: Text and progress bar color (default: "#F0F0F0")
 * 
 * TIPS:
 * - For best results, use a white/light logo on transparent background
 * - Logo should be square aspect ratio for optimal display
 * - The boiling effect works best with sketchy/hand-drawn logos
 * - Adjust duration based on your actual loading needs
 */
