import { useEffect, useState } from "react";
import { formatDateParts, getGreeting } from "../utils/date";

export const useClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return {
    now,
    ...formatDateParts(now),
    greeting: getGreeting(now)
  };
};

