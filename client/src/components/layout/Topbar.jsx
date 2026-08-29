import { Menu } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";

const Topbar = ({ user, theme, onToggleTheme, onMenuToggle }) => (
  <div className="glass-panel sticky top-4 z-20 flex items-center justify-between rounded-full px-4 py-3">
    <button
      type="button"
      onClick={onMenuToggle}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white/70 text-stone-900 lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-white"
    >
      <Menu size={18} />
    </button>

    <div className="hidden text-sm text-stone-600 lg:block dark:text-stone-300">A calm place for your daily memories.</div>

    <div className="ml-auto flex items-center gap-3">
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <div className="flex items-center gap-3 rounded-full border border-stone-200 bg-white/70 px-3 py-2 dark:border-white/10 dark:bg-white/5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-white dark:bg-white dark:text-stone-900">
          {user?.name?.slice(0, 1)?.toUpperCase() || "U"}
        </div>
        <div className="hidden pr-2 sm:block">
          <p className="text-sm font-medium text-stone-900 dark:text-white">{user?.name}</p>
          <p className="text-xs text-stone-500 dark:text-stone-400">{user?.email}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Topbar;

