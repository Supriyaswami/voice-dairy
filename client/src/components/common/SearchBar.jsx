import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder }) => (
  <div className="relative">
    <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-full border border-stone-200 bg-white/70 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-stone-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/30"
    />
  </div>
);

export default SearchBar;

