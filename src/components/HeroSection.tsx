import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import MannequinBalaclavaDVideo from "../imports/MannequinBalaclavaDVideo1";

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.01);
    }, 16);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #333333 1px, transparent 1px),
            linear-gradient(to bottom, #333333 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Abstract 3D Objects Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Wireframe Sphere */}
        <motion.div
          className="absolute w-[600px] h-[600px]"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative w-full h-full">
            {/* Wireframe circles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute inset-0 rounded-full border border-[#333333]"
                style={{
                  transform: `rotateY(${i * 22.5}deg) rotateX(${Math.sin(time + i) * 10}deg)`,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Liquid Metal Shape (Video Integration) */}
        <motion.div
          className="absolute w-96 h-96 opacity-30 mix-blend-screen"
          style={{
            rotateX: useTransform(rotateX, (v) => -v * 0.5),
            rotateY: useTransform(rotateY, (v) => -v * 0.5),
            transformStyle: "preserve-3d",
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotateZ: [0, 360],
          }}
          transition={{
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotateZ: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            <MannequinBalaclavaDVideo />
          </div>
        </motion.div>

        {/* Floating Cubes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`cube-${i}`}
            className="absolute w-24 h-24 border border-[#333333]"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              rotateX: useTransform(rotateX, (v) => v * (1 + i * 0.3)),
              rotateY: useTransform(rotateY, (v) => v * (1 + i * 0.3)),
              transformStyle: "preserve-3d",
            }}
            animate={{
              y: [0, -30, 0],
              rotateZ: [0, 180, 360],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
        {/* Main Headline - Oversized and Cropped */}
        <motion.div
          className="relative overflow-hidden mb-8"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <h1 className="relative inline-block">
            <span className="block" style={{ 
              fontSize: 'clamp(6rem, 20vw, 16rem)',
              letterSpacing: '-0.05em',
              lineHeight: '0.85',
            }}>
              TRACE
            </span>
            {/* Glitch effect on text */}
            <motion.span
              className="absolute inset-0 opacity-50 mix-blend-difference"
              animate={{
                x: [-2, 2, -2],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
              }}
              style={{ 
                fontSize: 'clamp(6rem, 20vw, 16rem)',
                letterSpacing: '-0.05em',
                lineHeight: '0.85',
              }}
            >
              TRACE
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2 className="relative" style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            letterSpacing: '-0.04em',
            lineHeight: '0.9',
          }}>
            COLLECTIVE
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="font-mono text-sm md:text-base mt-12 tracking-wider opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <p>A BUILDER-LED CREATIVE & VENTURE STUDIO</p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-2 h-2 bg-[#F0F0F0]" />
            <div className="w-2 h-2 bg-[#F0F0F0] opacity-60" />
            <div className="w-2 h-2 bg-[#F0F0F0] opacity-30" />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.button
            className="relative px-8 py-4 border border-[#F0F0F0] font-mono text-sm tracking-wider overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">EXPLORE WORK</span>
            <motion.div
              className="absolute inset-0 bg-[#F0F0F0]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-black z-20 transition-opacity duration-300">
              EXPLORE WORK
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Grid Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-[#333333]" />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-xs flex flex-col items-center gap-4"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="opacity-50">SCROLL</span>
        <div className="w-px h-12 bg-[#F0F0F0] opacity-30" />
      </motion.div>
    </section>
  );
}
