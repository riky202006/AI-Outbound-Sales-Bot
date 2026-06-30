import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-cyan-500/15 border-cyan-400/30 text-cyan-100 hover:border-cyan-300/60 hover:shadow-cyan-500/30",

  secondary:
    "bg-white/5 border-white/20 text-white hover:border-white/40",

  danger:
    "bg-red-500/15 border-red-400/30 text-red-100 hover:border-red-300/60 hover:shadow-red-500/30",
};

function Button({
  children,
  icon,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      {...props}
      className={`
        group
        relative
        overflow-hidden

        flex
        items-center
        justify-center
        gap-2

        px-6
        py-3

        rounded-full

        border

        backdrop-blur-xl

        font-semibold

        transition-all
        duration-500

        shadow-lg

        ${variants[variant]}

        ${className}
      `}
    >
      {/* Liquid Shine */}
      <span
        className="
          absolute
          inset-y-0
          -left-1/2
          w-1/2

          bg-gradient-to-r
          from-transparent
          via-white/30
          to-transparent

          skew-x-[-25deg]

          group-hover:left-[120%]

          transition-all
          duration-1000
        "
      />

      <span className="relative flex items-center gap-2">
        {icon}
        {children}
      </span>
    </motion.button>
  );
}

export default Button;