function TextArea({
  name,
  placeholder,
  value,
  onChange,
  rows = 4,
  className = "",
  ...props
}) {
  return (
    <textarea
      name={name}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl

        px-4
        py-3

        text-white
        placeholder:text-slate-400

        outline-none
        resize-none

        transition-all
        duration-300

        focus:border-cyan-400
        focus:bg-white/10
        focus:shadow-[0_0_20px_rgba(34,211,238,.25)]

        ${className}
      `}
      {...props}
    />
  );
}

export default TextArea;