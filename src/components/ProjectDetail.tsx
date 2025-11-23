import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { X, ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  fullDescription: string;
  technologies: string[];
  timeline: string;
  role: string;
  challenges: string[];
  results: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function ProjectDetail({ project, onClose, onNext, onPrev }: ProjectDetailProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    // Lock body scroll initially
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onNext, onPrev, mouseX, mouseY]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#1a1a1a] z-50">
        <motion.div
          className="h-full bg-[#F0F0F0]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header Navigation */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center backdrop-blur-sm bg-[#050505]/80"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Back Button */}
        <motion.button
          onClick={onClose}
          className="flex items-center gap-2 font-mono text-sm border border-[#333333] px-4 py-2 hover:border-[#F0F0F0] transition-colors group"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK_TO_PROJECTS</span>
        </motion.button>

        {/* Project Navigation */}
        <div className="flex items-center gap-4">
          {onPrev && (
            <motion.button
              onClick={onPrev}
              className="w-10 h-10 border border-[#333333] flex items-center justify-center hover:border-[#F0F0F0] transition-colors"
              whileHover={{ scale: 1.1, rotate: -90 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
          )}
          {onNext && (
            <motion.button
              onClick={onNext}
              className="w-10 h-10 border border-[#333333] flex items-center justify-center hover:border-[#F0F0F0] transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="w-10 h-10 border border-[#333333] flex items-center justify-center hover:border-[#F0F0F0] hover:rotate-90 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5" />
        </motion.button>

        <div className="absolute bottom-0 left-0 w-full h-px bg-[#333333]" />
      </motion.header>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Category & Year */}
            <div className="flex items-center gap-4 font-mono text-sm opacity-50 mb-6">
              <span>{project.category}</span>
              <div className="w-px h-4 bg-[#333333]" />
              <span>{project.year}</span>
              <div className="w-px h-4 bg-[#333333]" />
              <span>{project.timeline}</span>
            </div>

            {/* Title */}
            <h1 className="mb-8" style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              letterSpacing: '-0.04em',
              lineHeight: '0.9',
            }}>
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-xl opacity-70 max-w-3xl mb-8">
              {project.fullDescription}
            </p>

            {/* Links */}
            <div className="flex gap-4">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-[#F0F0F0] font-mono text-sm hover:bg-[#F0F0F0] hover:text-black transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LIVE_SITE</span>
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-[#333333] font-mono text-sm hover:border-[#F0F0F0] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4" />
                  <span>SOURCE_CODE</span>
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Featured Image with 3D Effect */}
          <motion.div
            className="relative mb-32 h-[70vh] overflow-hidden border border-[#333333]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Image Carousel */}
            <div className="relative w-full h-full">
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: index === currentImageIndex ? 1 : 0,
                    scale: index === currentImageIndex ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80`}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}

              {/* Scan Line Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F0F0F0] to-transparent opacity-10 pointer-events-none"
                animate={{
                  y: ["-100%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ height: "30%" }}
              />

              {/* Glitch Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#F0F0F0] to-transparent opacity-5 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Image Navigation */}
            {project.images.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {project.images.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className="w-12 h-1 bg-[#333333] hover:bg-[#F0F0F0] transition-colors"
                    animate={{
                      backgroundColor: index === currentImageIndex ? '#F0F0F0' : '#333333',
                    }}
                    whileHover={{ scaleY: 2 }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Role */}
              <div className="mb-16">
                <div className="font-mono text-sm opacity-50 mb-4">{'> MY_ROLE'}</div>
                <div className="text-2xl">{project.role}</div>
                <div className="h-px bg-[#333333] w-full mt-4" />
              </div>

              {/* Challenges */}
              <div className="mb-16">
                <div className="font-mono text-sm opacity-50 mb-6">{'> CHALLENGES_SOLVED'}</div>
                <div className="space-y-4">
                  {project.challenges.map((challenge, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="font-mono text-sm opacity-30 mt-1">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1">
                        <p className="text-lg opacity-80 group-hover:opacity-100 transition-opacity">
                          {challenge}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="h-px bg-[#333333] w-full mt-8" />
              </div>

              {/* Results */}
              <div className="mb-16">
                <div className="font-mono text-sm opacity-50 mb-6">{'> RESULTS_ACHIEVED'}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.results.map((result, index) => (
                    <motion.div
                      key={index}
                      className="p-6 border border-[#333333] hover:border-[#F0F0F0] transition-colors group relative overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="relative z-10">
                        <div className="font-mono text-xs opacity-50 mb-2">
                          METRIC_{String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="text-lg">{result}</div>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-[#F0F0F0] opacity-0 group-hover:opacity-5"
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="h-px bg-[#333333] w-full mt-8" />
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Technologies */}
              <div className="sticky top-32">
                <div className="font-mono text-sm opacity-50 mb-6">{'> TECH_STACK'}</div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      className="px-3 py-1 border border-[#333333] font-mono text-xs hover:border-[#F0F0F0] hover:bg-[#F0F0F0] hover:text-black transition-colors cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>

                {/* Project Info Box */}
                <div className="border border-[#333333] p-6 space-y-4">
                  <div>
                    <div className="font-mono text-xs opacity-50 mb-1">CATEGORY</div>
                    <div className="font-mono text-sm">{project.category}</div>
                  </div>
                  <div className="h-px bg-[#333333]" />
                  <div>
                    <div className="font-mono text-xs opacity-50 mb-1">YEAR</div>
                    <div className="font-mono text-sm">{project.year}</div>
                  </div>
                  <div className="h-px bg-[#333333]" />
                  <div>
                    <div className="font-mono text-xs opacity-50 mb-1">TIMELINE</div>
                    <div className="font-mono text-sm">{project.timeline}</div>
                  </div>
                  <div className="h-px bg-[#333333]" />
                  <div>
                    <div className="font-mono text-xs opacity-50 mb-1">STATUS</div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 bg-green-500"
                        animate={{
                          opacity: [1, 0.3, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      <div className="font-mono text-sm">LIVE</div>
                    </div>
                  </div>
                </div>

                {/* Decorative 3D Element */}
                <motion.div
                  className="mt-8 h-48 border border-[#333333] relative overflow-hidden"
                  animate={{
                    rotateZ: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#F0F0F0] to-transparent opacity-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-20 h-20 border border-[#333333]"
                        animate={{
                          rotateY: [0, 360],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 5 + i,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Next Project CTA */}
          {onNext && (
            <motion.div
              className="border-t border-[#333333] pt-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="font-mono text-sm opacity-50 mb-6">{'> NEXT_PROJECT'}</div>
              <motion.button
                onClick={onNext}
                className="group w-full text-left relative overflow-hidden border border-[#333333] p-8 hover:border-[#F0F0F0] transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">VIEW_NEXT_PROJECT</span>
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <div className="font-mono text-sm opacity-50">
                    CONTINUE_EXPLORING_OUR_WORK
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-[#F0F0F0] opacity-0 group-hover:opacity-5"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Background Grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #333333 1px, transparent 1px),
            linear-gradient(to bottom, #333333 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </motion.div>
  );
}
