const variants = {
  primary:
    "bg-stone-900 text-white hover:bg-stone-800 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200",
  secondary:
    "bg-white/80 text-stone-900 ring-1 ring-stone-200 hover:bg-white dark:bg-white/10 dark:text-white dark:ring-white/15 dark:hover:bg-white/15",
  ghost: "bg-transparent text-stone-700 hover:bg-stone-900/5 dark:text-stone-200 dark:hover:bg-white/10",
  danger: "bg-rose-600 text-white hover:bg-rose-500"
};

const Button = ({
  children,
  type = "button",
  className = "",
  variant = "primary",
  disabled = false,
  ...props
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;

