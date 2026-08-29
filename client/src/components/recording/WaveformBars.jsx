import { motion } from "framer-motion";

const bars = [16, 28, 22, 34, 18, 30, 24, 36, 20];

const WaveformBars = ({ active }) => (
  <div className="flex h-12 items-end justify-center gap-2">
    {bars.map((height, index) => (
      <motion.span
        key={`${height}-${index}`}
        animate={active ? { height: [8, height, 10] } : { height: 8 }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.2 + index * 0.05,
          delay: index * 0.08
        }}
        className="w-2 rounded-full bg-gradient-to-t from-orange-600 to-amber-300"
      />
    ))}
  </div>
);

export default WaveformBars;

