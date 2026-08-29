import { motion } from "framer-motion";

const Loader = ({ title, subtitle }) => (
  <div className="flex min-h-[240px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-stone-300/80 px-6 text-center dark:border-white/10">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.4, ease: "linear" }}
      className="mb-5 h-12 w-12 rounded-full border-4 border-stone-300 border-t-stone-900 dark:border-white/20 dark:border-t-white"
    />
    <h3 className="font-display text-2xl text-stone-900 dark:text-white">{title}</h3>
    {subtitle && <p className="mt-2 max-w-md text-sm text-stone-600 dark:text-stone-300">{subtitle}</p>}
  </div>
);

export default Loader;

