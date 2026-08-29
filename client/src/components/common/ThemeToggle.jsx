import { MoonStar, SunMedium } from "lucide-react";

const ThemeToggle = ({ theme, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white/70 text-stone-800 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-white"
    aria-label="Toggle theme"
  >
    {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
  </button>
);

export default ThemeToggle;

