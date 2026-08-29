import { motion } from "framer-motion";
import { Mic } from "lucide-react";

const MicrophoneOrb = ({ active, onClick }) => (
  <motion.button
    type="button"
    whileTap={{ scale: 0.96 }}
    animate={active ? { scale: [1, 1.04, 1] } : { scale: 1 }}
    transition={active ? { duration: 1.6, repeat: Number.POSITIVE_INFINITY } : { duration: 0.2 }}
    onClick={onClick}
    className={`relative flex h-40 w-40 items-center justify-center rounded-full border text-white shadow-page transition md:h-48 md:w-48 ${
      active
        ? "border-amber-200 bg-gradient-to-br from-amber-500 to-orange-700"
        : "border-stone-900 bg-gradient-to-br from-stone-900 to-stone-700 dark:border-white dark:from-stone-100 dark:to-white dark:text-stone-900"
    }`}
  >
    <span
      className={`absolute inset-0 rounded-full ${active ? "animate-pulseSoft bg-orange-400/20" : "bg-transparent"}`}
    />
    <Mic size={52} className="relative z-10" />
  </motion.button>
);

export default MicrophoneOrb;

