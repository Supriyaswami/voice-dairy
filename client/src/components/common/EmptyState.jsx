const EmptyState = ({ title, description }) => (
  <div className="rounded-[2rem] border border-dashed border-stone-300/90 px-6 py-12 text-center dark:border-white/10">
    <h3 className="font-display text-2xl text-stone-900 dark:text-white">{title}</h3>
    <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">{description}</p>
  </div>
);

export default EmptyState;

