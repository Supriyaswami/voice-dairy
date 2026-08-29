import { CalendarDays, BookOpenText, House, UserCircle2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Today", icon: House },
  { to: "/diaries", label: "Diaries", icon: BookOpenText },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/profile", label: "Profile", icon: UserCircle2 }
];

const Sidebar = () => (
  <aside className="glass-panel hidden w-72 shrink-0 rounded-[2rem] p-5 lg:flex lg:flex-col">
    <div className="px-2">
      <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">ECHO DIARY</p>
      <h1 className="mt-3 font-display text-4xl leading-none text-stone-900 dark:text-white">Speak your day.</h1>
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">Relive your memories in your own voice and words.</p>
    </div>

    <nav className="mt-8 space-y-2">
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-full px-4 py-3 text-sm transition ${
                isActive
                  ? "nav-link-active"
                  : "text-stone-700 hover:bg-stone-900/5 dark:text-stone-200 dark:hover:bg-white/10"
              }`
            }
          >
            <Icon size={18} />
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  </aside>
);

export default Sidebar;

