function Select({
  options = [],
  className = "",
  ...props
}) {
  return (
    <select
      {...props}
      className={`
        w-full
        rounded-2xl
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        px-4
        py-3
        text-white
        outline-none
        transition-all
        duration-300
        focus:border-cyan-400
        focus:bg-white/10
        focus:shadow-[0_0_20px_rgba(34,211,238,.25)]

        ${className}
      `}
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
          className="bg-slate-900 text-white"
        >
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;