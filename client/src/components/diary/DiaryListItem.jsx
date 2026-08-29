import { Link } from "react-router-dom";

const DiaryListItem = ({ diary }) => (
  <Link
    to={`/diaries/${diary._id}`}
    className="flex items-center justify-between rounded-[1.5rem] border border-stone-200 bg-white/70 px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
  >
    <div>
      <p className="font-medium text-stone-900 dark:text-white">{diary.date}</p>
      <p className="mt-1 line-clamp-1 text-sm text-stone-500 dark:text-stone-400">{diary.title}</p>
    </div>
    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">{diary.day}</p>
  </Link>
);

export default DiaryListItem;

