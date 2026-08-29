export const formatDateParts = (date = new Date()) => ({
  day: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date),
  date: new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date),
  time: new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  }).format(date)
});

export const getGreeting = (date = new Date()) => {
  const hour = date.getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

export const groupDiariesByMonth = (diaries) =>
  diaries.reduce((groups, diary) => {
    const monthYear = new Date(diary.createdAt).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }

    groups[monthYear].push(diary);
    return groups;
  }, {});

