import { motion } from "motion/react";

export function Navigation() {
  const navItems = ["WORK", "ABOUT", "CONTACT"];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      {/* Logo */}
      <motion.div
        className="font-mono tracking-wider"
        whileHover={{ x: 2 }}
      >
        TRACE_COLLECTIVE
      </motion.div>

      {/* Nav Links */}
      <div className="flex gap-8 font-mono text-sm">
        {navItems.map((item, index) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ x: 2 }}
          >
            <span className="relative z-10">{item}</span>
            <motion.div
              className="absolute inset-0 bg-[#F0F0F0] opacity-0 group-hover:opacity-10 -z-10"
              initial={false}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <div className="absolute -bottom-1 left-0 w-0 h-px bg-[#F0F0F0] group-hover:w-full transition-all duration-300" />
          </motion.a>
        ))}
      </div>

      {/* Grid Lines Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-[#333333]" />
    </motion.nav>
  );
}
