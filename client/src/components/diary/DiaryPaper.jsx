const DiaryPaper = ({ day, date, time, content, children }) => (
  <article className="paper-lines rounded-[2.5rem] border border-[#e2cfbb] bg-surface-base bg-paper px-8 py-10 shadow-page dark:border-[#6e5845] dark:bg-[#241c18]">
    <div className="mb-8 border-b border-[#dcc6b0] pb-6 dark:border-[#644f3d]">
      <p className="text-sm uppercase tracking-[0.3em] text-[#9b6f47]">{day}</p>
      <h1 className="mt-2 font-display text-4xl text-surface-ink dark:text-[#f6eadb]">{date}</h1>
      <p className="mt-2 text-sm text-[#73563d] dark:text-[#d7c1ac]">{time}</p>
    </div>

    <div className="whitespace-pre-wrap font-display text-[1.2rem] leading-[2rem] text-[#36281d] dark:text-[#f1e3d3]">
      {content}
    </div>

    {children && <div className="mt-10 border-t border-[#dcc6b0] pt-6 dark:border-[#644f3d]">{children}</div>}
  </article>
);

export default DiaryPaper;

