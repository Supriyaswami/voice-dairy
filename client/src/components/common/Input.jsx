const Input = ({ label, error, className = "", ...props }) => (
  <label className="block space-y-2">
    {label && <span className="text-sm font-medium text-stone-600 dark:text-stone-300">{label}</span>}
    <input
      className={`w-full rounded-2xl border border-stone-200 bg-white/70 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/30 ${className}`}
      {...props}
    />
    {error && <span className="text-sm text-rose-500">{error}</span>}
  </label>
);

export default Input;

