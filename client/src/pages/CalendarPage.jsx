import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Loader from "../components/common/Loader";
import CalendarGrid from "../components/diary/CalendarGrid";
import { diaryService } from "../services/diaryService";
import { extractApiError } from "../services/api";

const CalendarPage = () => {
  const [monthDate, setMonthDate] = useState(new Date());
  const [diaries, setDiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchDiaries = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await diaryService.getDiaries();
        if (!ignore) {
          setDiaries(response.diaries);
        }
      } catch (requestError) {
        if (!ignore) {
          setError(extractApiError(requestError, "We could not load your calendar."));
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchDiaries();
    return () => {
      ignore = true;
    };
  }, []);

  const heading = useMemo(
    () =>
      monthDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      }),
    [monthDate]
  );

  return (
    <Card className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">Calendar</p>
          <h1 className="mt-3 font-display text-4xl text-stone-900 dark:text-white">{heading}</h1>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="h-11 w-11 rounded-full px-0"
            onClick={() => setMonthDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
          >
            <ChevronLeft size={18} />
          </Button>
          <Button
            variant="secondary"
            className="h-11 w-11 rounded-full px-0"
            onClick={() => setMonthDate((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <Loader title="Loading calendar..." subtitle="Placing dots on the days that hold memories." />
      ) : error ? (
        <p className="text-sm text-rose-500">{error}</p>
      ) : (
        <CalendarGrid monthDate={monthDate} diaries={diaries} />
      )}
    </Card>
  );
};

export default CalendarPage;

