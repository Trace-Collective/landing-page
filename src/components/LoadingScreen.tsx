import { motion } from "motion/react";
import { useEffect, useState } from "react";
import logoSketch from "figma:asset/9e4cddaddbf4263c31851a96ed4fce5e362b7edf.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* SVG Filters for Boiling Effect */}
      <svg className="absolute w-0 h-0">
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

      {/* Animated Logo with Boiling Effect */}
      <motion.div
        className="relative mb-12"
        animate={{
          scale: [1, 1.02, 0.98, 1.01, 1],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <motion.img
          src={logoSketch}
          alt="Trace Collective"
          className="w-48 h-48 object-contain"
          style={{
            filter: "url(#turbulence-0)",
            animation: "boil 0.6s infinite",
          }}
        />
        
        {/* Glitch Layers */}
        {progress > 50 && (
          <>
            <motion.img
              src={logoSketch}
              alt=""
              className="absolute inset-0 w-48 h-48 object-contain opacity-70"
              style={{
                mixBlendMode: "screen",
                animation: "glitch 0.3s infinite",
              }}
            />
            <motion.img
              src={logoSketch}
              alt=""
              className="absolute inset-0 w-48 h-48 object-contain opacity-50"
              style={{
                mixBlendMode: "screen",
                animation: "glitch 0.4s infinite reverse",
                filter: "hue-rotate(180deg)",
              }}
            />
          </>
        )}
      </motion.div>

      {/* Terminal Code Effect */}
      <div className="font-mono text-xs text-[#F0F0F0] opacity-50 mb-8 overflow-hidden h-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div>{'> INITIALIZING TRACE_COLLECTIVE.CORE'}</div>
          <div>{'> LOADING ASSETS... [OK]'}</div>
          <div>{'> COMPILING 3D_RENDERER... [OK]'}</div>
          <div>{'> ESTABLISHING CONNECTION...'}</div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-[#1a1a1a] relative overflow-hidden">
        <motion.div
          className="h-full bg-[#F0F0F0] relative"
          style={{ width: `${progress}%` }}
        >
          {/* Rough Line Effect */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full w-px bg-black"
                style={{ left: `${i * 5}%` }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Progress Percentage */}
      <div className="font-mono text-sm text-[#F0F0F0] mt-4">
        {progress.toString().padStart(3, '0')}%
      </div>

      {/* Glitch Screen Effect at 100% */}
      {progress === 100 && (
        <motion.div
          className="absolute inset-0 bg-white mix-blend-difference"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0, 1, 0, 1, 0],
            scaleX: [1, 0.8, 1, 0.9, 1],
          }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
}
