import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function AboutSection() {
  const services = [
    {
      title: "WEB3_DEVELOPMENT",
      description: "Smart contracts, DApps, and blockchain infrastructure. We build secure, scalable Web3 solutions that bridge the gap between traditional web and decentralized systems.",
      tools: ["Solidity", "Rust", "React", "ethers.js", "Hardhat"]
    },
    {
      title: "BRAND_IDENTITY",
      description: "Complete visual systems from logo to motion design. We create bold, memorable identities that challenge conventions and stand out in crowded markets.",
      tools: ["Figma", "After Effects", "Illustrator", "Blender", "Typography"]
    },
    {
      title: "DIGITAL_PRODUCTS",
      description: "End-to-end product development from concept to launch. User-centric design meets technical excellence to create products people actually want to use.",
      tools: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"]
    },
    {
      title: "VENTURE_BUILDING",
      description: "Strategic planning and execution for new ventures. We help founders validate ideas, build MVPs, and scale products through data-driven iteration.",
      tools: ["Strategy", "Market Research", "MVP Development", "Growth Hacking"]
    },
    {
      title: "CREATIVE_DIRECTION",
      description: "Vision and leadership for creative projects. We guide teams to produce work that's not just beautiful, but meaningful and impactful.",
      tools: ["Art Direction", "Concept Development", "Team Leadership", "Quality Assurance"]
    },
    {
      title: "INFRASTRUCTURE",
      description: "Robust backend systems and DevOps practices. We build the invisible foundation that makes everything else possible and reliable.",
      tools: ["AWS", "Docker", "Kubernetes", "CI/CD", "Monitoring"]
    },
  ];

  const [expandedService, setExpandedService] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <section className="relative min-h-screen py-32 px-8" id="about">
      {/* Section Header */}
      <motion.div
        className="max-w-7xl mx-auto mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          letterSpacing: '-0.03em',
          lineHeight: '1',
        }}>
          ABOUT_US
        </h2>
        <div className="h-px bg-[#333333] w-full mt-4" />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-sm opacity-50 mb-6">
              {'> INTRODUCTION'}
            </div>
            <div className="space-y-6" style={{
              fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
              lineHeight: '1.6',
            }}>
              <p>
                We are a collective of builders, designers, and strategists who create
                at the intersection of technology and culture.
              </p>
              <p className="opacity-70">
                Our approach is rooted in experimentation, pushing boundaries between
                digital infrastructure and creative expression.
              </p>
              <p className="opacity-50">
                We don't just build products—we architect ecosystems that empower
                communities and redefine possibilities.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-[#333333]">
              {[
                { number: "50+", label: "PROJECTS" },
                { number: "12", label: "VENTURES" },
                { number: "∞", label: "IDEAS" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="text-4xl mb-2">{stat.number}</div>
                  <div className="font-mono text-xs opacity-50">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Services */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-sm opacity-50 mb-6">
              {'> CAPABILITIES'}
            </div>
            <div className="space-y-0">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="group relative border-b border-[#333333]"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {/* Header */}
                  <div 
                    className="flex items-center justify-between py-4 cursor-pointer"
                    onClick={() => toggleService(index)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="font-mono text-xs opacity-30">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <motion.span
                        className="font-mono tracking-wider"
                        animate={{
                          x: expandedService === index ? 4 : 0,
                        }}
                        style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
                      >
                        {service.title}
                      </motion.span>
                    </div>
                    <motion.div
                      className="w-6 h-6 border border-[#333333] flex items-center justify-center"
                      animate={{
                        rotate: expandedService === index ? 180 : 0,
                        borderColor: expandedService === index ? '#F0F0F0' : '#333333',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {expandedService === index ? (
                        <Minus className="w-3 h-3" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                    </motion.div>
                  </div>

                  {/* Dropdown Content */}
                  <AnimatePresence>
                    {expandedService === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pl-12 pr-4">
                          {/* Description */}
                          <p className="text-sm opacity-70 mb-4 leading-relaxed">
                            {service.description}
                          </p>

                          {/* Tools/Tech */}
                          <div className="flex flex-wrap gap-2">
                            {service.tools.map((tool, toolIndex) => (
                              <motion.span
                                key={tool}
                                className="px-2 py-1 border border-[#333333] font-mono text-xs"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: toolIndex * 0.05 }}
                              >
                                {tool}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover Background Effect */}
                  <motion.div
                    className="absolute inset-0 bg-[#F0F0F0] opacity-0 group-hover:opacity-5 pointer-events-none"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Contact CTA */}
            <motion.div
              className="mt-16 p-8 border border-[#333333] relative overflow-hidden group cursor-pointer"
              whileHover={{ borderColor: "#F0F0F0" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="relative z-10">
                <div className="font-mono text-xs opacity-50 mb-4">
                  {'> START_A_PROJECT'}
                </div>
                <div className="text-2xl mb-4">
                  LET'S BUILD SOMETHING
                </div>
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span>CONTACT US</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>
              </div>
              <motion.div
                className="absolute inset-0 bg-[#F0F0F0]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-black">
                <div className="font-mono text-xs mb-4">
                  {'> START_A_PROJECT'}
                </div>
                <div className="text-2xl mb-4">
                  LET'S BUILD SOMETHING
                </div>
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span>CONTACT US</span>
                  <span>→</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none">
        <motion.div
          className="w-full h-full rounded-full border border-[#333333]"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </section>
  );
}