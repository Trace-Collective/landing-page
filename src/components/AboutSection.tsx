import { motion } from "motion/react";

export function AboutSection() {
  const services = [
    "WEB3_DEVELOPMENT",
    "BRAND_IDENTITY",
    "DIGITAL_PRODUCTS",
    "VENTURE_BUILDING",
    "CREATIVE_DIRECTION",
    "INFRASTRUCTURE",
  ];

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
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service}
                  className="group relative"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="flex items-center justify-between py-4 border-b border-[#333333] cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs opacity-30">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <motion.span
                        className="font-mono tracking-wider"
                        whileHover={{ x: 4 }}
                        style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
                      >
                        {service}
                      </motion.span>
                    </div>
                    <motion.div
                      className="w-6 h-6 border border-[#333333] flex items-center justify-center"
                      whileHover={{ rotate: 45, scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-3 h-px bg-[#F0F0F0]" />
                    </motion.div>
                  </div>
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
