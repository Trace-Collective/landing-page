import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Project } from "../types/project";

interface PortfolioSectionProps {
  onProjectClick?: (project: Project) => void;
}

const projects: Project[] = [
  {
    id: 1,
    title: "NEURAL_INTERFACE_V2",
    category: "WEB3 / AI",
    year: "2025",
    description: "Decentralized AI platform for creative workflows",
    image: "abstract tech neural",
    fullDescription: "A groundbreaking decentralized AI platform that empowers creators with privacy-first machine learning tools. Built on Web3 infrastructure to ensure data sovereignty and fair compensation for AI training contributions.",
    technologies: ["React", "Solidity", "TensorFlow.js", "IPFS", "Ethereum", "Next.js", "WebGL"],
    timeline: "6 months",
    role: "Lead Developer & System Architect",
    challenges: [
      "Implementing on-chain AI model verification without compromising privacy",
      "Optimizing inference performance for browser-based neural networks",
      "Creating intuitive UX for complex cryptographic operations",
      "Building scalable infrastructure for decentralized model storage"
    ],
    results: [
      "10,000+ active users",
      "99.9% uptime",
      "50ms average inference time",
      "$2M in creator earnings"
    ],
    images: ["img1", "img2", "img3"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 2,
    title: "DARK_MATTER_STUDIOS",
    category: "BRAND / DIGITAL",
    year: "2024",
    description: "Complete brand identity for experimental music label",
    image: "dark abstract studio",
    fullDescription: "A comprehensive brand identity and digital ecosystem for an avant-garde music label pushing the boundaries of experimental sound. The project encompasses visual identity, web presence, and interactive audio experiences.",
    technologies: ["Next.js", "Three.js", "Web Audio API", "Framer Motion", "Tailwind", "Tone.js"],
    timeline: "4 months",
    role: "Creative Director & Frontend Lead",
    challenges: [
      "Creating a visual system that reflects experimental audio aesthetics",
      "Building performant 3D audio visualizations for web",
      "Designing an intuitive catalog system for unconventional music formats",
      "Ensuring accessibility while maintaining artistic vision"
    ],
    results: [
      "200% increase in engagement",
      "Featured on Awwwards",
      "15 international design awards",
      "4.9/5 user satisfaction"
    ],
    images: ["img1", "img2", "img3"],
    liveUrl: "https://example.com"
  },
  {
    id: 3,
    title: "VOID_MARKETPLACE",
    category: "ECOMMERCE / WEB3",
    year: "2024",
    description: "NFT marketplace with zero-knowledge proofs",
    image: "futuristic marketplace",
    fullDescription: "A next-generation NFT marketplace leveraging zero-knowledge cryptography to enable private transactions while maintaining verifiable scarcity. Revolutionary approach to digital asset trading with enhanced privacy guarantees.",
    technologies: ["Solidity", "zk-SNARKs", "React", "ethers.js", "IPFS", "Hardhat", "TheGraph"],
    timeline: "8 months",
    role: "Blockchain Architect & Smart Contract Developer",
    challenges: [
      "Implementing zero-knowledge proofs for private NFT ownership",
      "Balancing privacy with marketplace transparency requirements",
      "Optimizing gas costs for complex cryptographic operations",
      "Creating seamless UX for advanced cryptographic features"
    ],
    results: [
      "$50M trading volume",
      "25,000+ registered users",
      "500+ verified collections",
      "Featured in CoinDesk"
    ],
    images: ["img1", "img2", "img3", "img4"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 4,
    title: "CIPHER_PROTOCOL",
    category: "DEFI / INFRASTRUCTURE",
    year: "2024",
    description: "Privacy-first DeFi protocol and governance system",
    image: "abstract crypto technology",
    fullDescription: "An innovative DeFi protocol that brings privacy to decentralized finance through advanced cryptographic techniques. Enables confidential transactions while maintaining the transparency needed for trustless governance.",
    technologies: ["Solidity", "Rust", "Circom", "React", "Substrate", "zk-SNARKs", "Web3.js"],
    timeline: "12 months",
    role: "Protocol Designer & Core Developer",
    challenges: [
      "Designing economic models for privacy-preserving DeFi",
      "Implementing secure multi-party computation for governance",
      "Ensuring protocol security through extensive audits",
      "Creating clear documentation for complex cryptographic systems"
    ],
    results: [
      "$100M TVL reached",
      "Zero security incidents",
      "50+ protocol integrations",
      "DAO with 10K+ members"
    ],
    images: ["img1", "img2"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com"
  },
  {
    id: 5,
    title: "GHOST_NETWORK",
    category: "SOCIAL / WEB3",
    year: "2023",
    description: "Anonymous social platform for builders and creators",
    image: "network abstract dark",
    fullDescription: "A Web3-native social platform that enables pseudonymous collaboration and content sharing. Built for creators who value privacy while building reputation through verifiable achievements and contributions.",
    technologies: ["Next.js", "Ceramic", "IPFS", "DID", "React", "GraphQL", "WebRTC"],
    timeline: "7 months",
    role: "Full-Stack Developer & Product Lead",
    challenges: [
      "Building reputation systems without revealing identity",
      "Implementing end-to-end encrypted messaging at scale",
      "Creating intuitive onboarding for Web3 concepts",
      "Moderating content while preserving anonymity"
    ],
    results: [
      "50,000+ active users",
      "1M+ encrypted messages",
      "98% user retention",
      "Community-driven growth"
    ],
    images: ["img1", "img2", "img3"],
    liveUrl: "https://example.com"
  },
  {
    id: 6,
    title: "MONOLITH_FRAMEWORK",
    category: "DEVELOPER TOOLS",
    year: "2023",
    description: "Open-source framework for building brutalist web apps",
    image: "geometric monolith",
    fullDescription: "An opinionated React framework and design system for building bold, brutalist web applications. Combines modern developer experience with a distinctive aesthetic philosophy that challenges conventional design patterns.",
    technologies: ["React", "TypeScript", "Tailwind", "Vite", "Storybook", "Vitest", "NPM"],
    timeline: "10 months",
    role: "Framework Author & Maintainer",
    challenges: [
      "Creating flexible components that maintain brutalist aesthetic",
      "Building comprehensive documentation and examples",
      "Establishing community contribution guidelines",
      "Balancing opinionation with customization needs"
    ],
    results: [
      "5,000+ GitHub stars",
      "100+ contributors",
      "500+ projects built",
      "Featured on GitHub Trending"
    ],
    images: ["img1", "img2", "img3"],
    githubUrl: "https://github.com"
  },
];

export function PortfolioSection({ onProjectClick }: PortfolioSectionProps) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleProjectClick = (project: Project) => {
    if (onProjectClick) {
      onProjectClick(project);
    }
  };

  return (
    <section 
      className="relative min-h-screen py-32 px-8" 
      id="work"
      onMouseMove={handleMouseMove}
    >
      {/* Section Header */}
      <motion.div
        className="max-w-7xl mx-auto mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-baseline gap-8 mb-4">
          <h2 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            letterSpacing: '-0.03em',
            lineHeight: '1',
          }}>
            SELECTED WORK
          </h2>
          <span className="font-mono text-sm opacity-50">2023—2025</span>
        </div>
        <div className="h-px bg-[#333333] w-full" />
      </motion.div>

      {/* Project List */}
      <div className="max-w-7xl mx-auto">
        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative border-b border-[#333333] group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="grid grid-cols-12 gap-4 py-8 items-center cursor-pointer" onClick={() => handleProjectClick(project)}>
                {/* Index */}
                <div className="col-span-1 font-mono text-sm opacity-30">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Project Title */}
                <div className="col-span-5 md:col-span-6">
                  <motion.h3
                    className="font-mono tracking-wider relative inline-block"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    }}
                  >
                    {project.title}
                    <motion.div
                      className="absolute inset-0 bg-[#F0F0F0] mix-blend-difference opacity-0 group-hover:opacity-100"
                      initial={false}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.h3>
                </div>

                {/* Category */}
                <div className="col-span-3 md:col-span-3 font-mono text-sm opacity-50">
                  {project.category}
                </div>

                {/* Year */}
                <div className="col-span-2 md:col-span-2 font-mono text-sm text-right opacity-50">
                  {project.year}
                </div>

                {/* Arrow indicator */}
                <div className="col-span-1 flex justify-end">
                  <motion.div
                    className="w-8 h-8 border border-[#333333] flex items-center justify-center"
                    animate={{
                      x: hoveredProject?.id === project.id ? 8 : 0,
                      rotate: hoveredProject?.id === project.id ? 45 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-4 h-px bg-[#F0F0F0]" />
                  </motion.div>
                </div>
              </div>

              {/* Hover Background Effect */}
              <motion.div
                className="absolute inset-0 bg-[#F0F0F0] opacity-0 group-hover:opacity-5 pointer-events-none"
                initial={false}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Preview Card (Custom Cursor) */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            className="fixed pointer-events-none z-50"
            style={{
              left: mousePosition.x + 20,
              top: mousePosition.y + 20,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-96 h-96 bg-[#0a0a0a] border border-[#333333] overflow-hidden">
              {/* Glitch Border Effect */}
              <motion.div
                className="absolute inset-0 border-2 border-[#F0F0F0]"
                animate={{
                  clipPath: [
                    "inset(0% 0% 100% 0%)",
                    "inset(0% 0% 0% 0%)",
                    "inset(100% 0% 0% 0%)",
                  ],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Project Image */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="w-full h-full"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80`}
                    alt={hoveredProject.title}
                    className="w-full h-full object-cover opacity-60 mix-blend-screen"
                  />
                </motion.div>
              </div>

              {/* Distortion Shader Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#F0F0F0] to-transparent opacity-10 mix-blend-overlay" />

              {/* Project Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <div className="font-mono text-xs opacity-70 mb-2">
                  {hoveredProject.category}
                </div>
                <div className="font-mono text-sm">
                  {hoveredProject.description}
                </div>
              </div>

              {/* Scan Line Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F0F0F0] to-transparent opacity-20"
                animate={{
                  y: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ height: "30%" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #333333 1px, transparent 1px),
            linear-gradient(to bottom, #333333 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </section>
  );
}