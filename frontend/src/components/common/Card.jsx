import { motion } from "framer-motion";

function Card({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        group
        relative
        overflow-hidden

        rounded-[28px]

        border
        border-white/15

        bg-white/[0.07]

        backdrop-blur-[30px]

        shadow-[0_20px_60px_rgba(0,0,0,.45)]

        transition-all
        duration-500

        hover:border-cyan-400/40
        hover:shadow-[0_0_35px_rgba(34,211,238,.18)]

        ${className}
      `}
    >
      {/* Top Glass Reflection */}
      <div
        className="
          absolute
          left-0
          top-0
          h-1/2
          w-full

          bg-gradient-to-b
          from-white/12
          to-transparent

          pointer-events-none
        "
      />

      {/* Animated Liquid Shine */}
      <div
        className="
          absolute
          -left-1/2
          top-0

          h-full
          w-1/2

          rotate-12

          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent

          opacity-0

          group-hover:opacity-100
          group-hover:left-[150%]

          duration-1000
          transition-all

          pointer-events-none
        "
      />

      {/* Bottom Ambient Glow */}
      <div
        className="
          absolute
          -bottom-24
          left-1/2
          -translate-x-1/2

          h-44
          w-44

          rounded-full

          bg-cyan-500/10

          blur-3xl

          pointer-events-none
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default Card;