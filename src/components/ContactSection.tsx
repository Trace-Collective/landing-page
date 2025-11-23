import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Plus, Minus, ExternalLink } from "lucide-react";

export function ContactSection() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [expandedSocial, setExpandedSocial] = useState<number | null>(null);

  const socialLinks = [
    { 
      name: "TWITTER", 
      handle: "@trace_collective",
      url: "https://twitter.com/trace_collective",
      followers: "12.5K",
      description: "Daily updates on our projects, thoughts on Web3, design experiments, and behind-the-scenes of our creative process."
    },
    { 
      name: "GITHUB", 
      handle: "github.com/trace",
      url: "https://github.com/trace",
      followers: "8.2K",
      description: "Open-source contributions, experimental frameworks, and code repositories. All our public work lives here."
    },
    { 
      name: "DISCORD", 
      handle: "discord.gg/trace",
      url: "https://discord.gg/trace",
      followers: "5.8K",
      description: "Join our community of builders, creators, and innovators. Collaborate, share ideas, and get exclusive updates."
    },
  ];

  const toggleSocial = (index: number) => {
    setExpandedSocial(expandedSocial === index ? null : index);
  };

  return (
    <section className="relative min-h-screen py-32 px-8" id="contact">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-20"
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
            GET_IN_TOUCH
          </h2>
          <div className="h-px bg-[#333333] w-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-sm opacity-50 mb-8">
              {'> SEND_MESSAGE'}
            </div>

            <form className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-0.5 bg-[#F0F0F0] opacity-0"
                  animate={{
                    opacity: focusedField === "name" ? 0.1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <input
                  type="text"
                  placeholder="YOUR_NAME"
                  className="w-full bg-transparent border border-[#333333] px-4 py-4 font-mono text-sm focus:outline-none focus:border-[#F0F0F0] transition-colors relative z-10"
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-0.5 bg-[#F0F0F0] opacity-0"
                  animate={{
                    opacity: focusedField === "email" ? 0.1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <input
                  type="email"
                  placeholder="EMAIL_ADDRESS"
                  className="w-full bg-transparent border border-[#333333] px-4 py-4 font-mono text-sm focus:outline-none focus:border-[#F0F0F0] transition-colors relative z-10"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Project Type Field */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-0.5 bg-[#F0F0F0] opacity-0"
                  animate={{
                    opacity: focusedField === "project" ? 0.1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <select
                  className="w-full bg-transparent border border-[#333333] px-4 py-4 font-mono text-sm focus:outline-none focus:border-[#F0F0F0] transition-colors relative z-10 appearance-none cursor-pointer"
                  onFocus={() => setFocusedField("project")}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="">PROJECT_TYPE</option>
                  <option value="web3">WEB3_DEVELOPMENT</option>
                  <option value="brand">BRAND_IDENTITY</option>
                  <option value="product">DIGITAL_PRODUCT</option>
                  <option value="venture">VENTURE_BUILDING</option>
                  <option value="other">OTHER</option>
                </select>
              </div>

              {/* Message Field */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-0.5 bg-[#F0F0F0] opacity-0"
                  animate={{
                    opacity: focusedField === "message" ? 0.1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <textarea
                  placeholder="MESSAGE_CONTENT"
                  rows={6}
                  className="w-full bg-transparent border border-[#333333] px-4 py-4 font-mono text-sm focus:outline-none focus:border-[#F0F0F0] transition-colors resize-none relative z-10"
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full relative px-8 py-4 border border-[#F0F0F0] font-mono text-sm tracking-wider overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">SEND_MESSAGE</span>
                <motion.div
                  className="absolute inset-0 bg-[#F0F0F0]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-black z-20 transition-opacity duration-300">
                  SEND_MESSAGE
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column - Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Direct Contact */}
            <div>
              <div className="font-mono text-sm opacity-50 mb-6">
                {'> DIRECT_CONTACT'}
              </div>
              <div className="space-y-4">
                <motion.a
                  href="mailto:hello@tracecollective.xyz"
                  className="block font-mono text-xl group cursor-pointer"
                  whileHover={{ x: 4 }}
                >
                  <span className="relative">
                    hello@tracecollective.xyz
                    <div className="absolute -bottom-1 left-0 w-0 h-px bg-[#F0F0F0] group-hover:w-full transition-all duration-300" />
                  </span>
                </motion.a>
                <div className="font-mono text-sm opacity-50">
                  Available Mon—Fri, 9:00—18:00 UTC
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div className="font-mono text-sm opacity-50 mb-6">
                {'> SOCIAL_CHANNELS'}
              </div>
              <div className="space-y-0">
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    className="group relative border-b border-[#333333]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    {/* Header */}
                    <div 
                      className="flex items-center justify-between py-3 cursor-pointer"
                      onClick={() => toggleSocial(index)}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <span className="font-mono text-sm opacity-30 w-8">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <motion.div 
                            className="font-mono"
                            animate={{
                              x: expandedSocial === index ? 2 : 0,
                            }}
                          >
                            {link.name}
                          </motion.div>
                          <div className="font-mono text-xs opacity-50">{link.handle}</div>
                        </div>
                      </div>
                      <motion.div
                        className="w-6 h-6 border border-[#333333] flex items-center justify-center"
                        animate={{
                          rotate: expandedSocial === index ? 180 : 0,
                          borderColor: expandedSocial === index ? '#F0F0F0' : '#333333',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {expandedSocial === index ? (
                          <Minus className="w-3 h-3" />
                        ) : (
                          <Plus className="w-3 h-3" />
                        )}
                      </motion.div>
                    </div>

                    {/* Dropdown Content */}
                    <AnimatePresence>
                      {expandedSocial === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div style={{ paddingLeft: '4rem', paddingRight: '4rem', paddingBottom: '2.5rem' }}>
                            {/* Description */}
                            <p className="text-xs opacity-70 mb-4 leading-relaxed">
                              {link.description}
                            </p>

                            {/* Stats & Link */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="font-mono text-xs opacity-50">
                                  {link.followers} FOLLOWERS
                                </div>
                              </div>
                              <motion.a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1 border border-[#333333] font-mono text-xs hover:border-[#F0F0F0] hover:bg-[#F0F0F0] hover:text-black transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <span>VISIT</span>
                                <ExternalLink className="w-3 h-3" />
                              </motion.a>
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
            </div>

            {/* Location */}
            <div className="p-8 border border-[#333333]">
              <div className="font-mono text-sm opacity-50 mb-4">
                {'> LOCATION'}
              </div>
              <div className="space-y-2">
                <div className="font-mono">DISTRIBUTED_GLOBALLY</div>
                <div className="font-mono text-sm opacity-50">
                  Remote-first • Timezone agnostic
                </div>
              </div>
              <div className="mt-6 flex gap-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-[#333333]"
                    animate={{
                      height: [20, Math.random() * 40 + 10, 20],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="max-w-7xl mx-auto mt-32 pt-8 border-t border-[#333333]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="font-mono text-xs opacity-50">
            © 2025 TRACE_COLLECTIVE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6 font-mono text-xs">
            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">
              PRIVACY_POLICY
            </a>
            <a href="#" className="opacity-50 hover:opacity-100 transition-opacity">
              TERMS_OF_SERVICE
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}