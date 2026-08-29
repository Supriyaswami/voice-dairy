import { Link } from "react-router-dom";

const CalendarGrid = ({ monthDate, diaries }) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const leadingEmptyDays = (firstDay.getDay() + 6) % 7;
  const totalCells = leadingEmptyDays + lastDay.getDate();
  const gridCells = Array.from({ length: Math.ceil(totalCells / 7) * 7 }, (_, index) => index + 1);

  const diaryMap = diaries.reduce((map, diary) => {
    const createdAt = new Date(diary.createdAt);
    if (createdAt.getMonth() === month && createdAt.getFullYear() === year) {
      map[createdAt.getDate()] = diary;
    }
    return map;
  }, {});

  return (
    <div>
      <div className="mb-4 grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {gridCells.map((cell) => {
          const dayNumber = cell - leadingEmptyDays;
          const isInMonth = dayNumber > 0 && dayNumber <= lastDay.getDate();
          const diary = isInMonth ? diaryMap[dayNumber] : null;

          const content = (
            <div
              className={`flex aspect-square flex-col rounded-[1.35rem] border p-3 transition ${
                isInMonth
                  ? "border-stone-200 bg-white/70 text-stone-900 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  : "border-transparent bg-transparent text-transparent"
              }`}
            >
              {isInMonth && (
                <>
                  <span className="text-sm font-medium">{dayNumber}</span>
                  {diary && <span className="mt-auto h-2 w-2 rounded-full bg-surface-dot" />}
                </>
              )}
            </div>
          );

          return diary ? (
            <Link key={cell} to={`/diaries/${diary._id}`} className="block hover:-translate-y-0.5">
              {content}
            </Link>
          ) : (
            <div key={cell}>{content}</div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;

