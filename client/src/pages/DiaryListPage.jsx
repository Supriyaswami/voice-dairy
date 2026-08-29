import { useEffect, useState } from "react";
import Card from "../components/common/Card";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import SearchBar from "../components/common/SearchBar";
import DiaryListItem from "../components/diary/DiaryListItem";
import { useDebounce } from "../hooks/useDebounce";
import { diaryService } from "../services/diaryService";
import { extractApiError } from "../services/api";
import { groupDiariesByMonth } from "../utils/date";

const DiaryListPage = () => {
  const [query, setQuery] = useState("");
  const [diaries, setDiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    let ignore = false;

    const fetchDiaries = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await diaryService.getDiaries(debouncedQuery);
        if (!ignore) {
          setDiaries(response.diaries);
        }
      } catch (requestError) {
        if (!ignore) {
          setError(extractApiError(requestError, "We could not load your diaries."));
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
  }, [debouncedQuery]);

  const groupedDiaries = groupDiariesByMonth(diaries);

  return (
    <div className="space-y-4">
      <Card className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">Archive</p>
          <h1 className="mt-3 font-display text-4xl text-stone-900 dark:text-white">Your diary timeline</h1>
        </div>
        <SearchBar
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by date, month, year, transcript, or diary text..."
        />
      </Card>

      <Card>
        {isLoading ? (
          <Loader title="Loading diaries..." subtitle="Gathering your saved memories." />
        ) : error ? (
          <p className="text-sm text-rose-500">{error}</p>
        ) : diaries.length === 0 ? (
          <EmptyState title="No diaries found" description="Your saved entries will appear here, grouped by month and year." />
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedDiaries).map(([monthYear, entries]) => (
              <section key={monthYear}>
                <h2 className="font-display text-3xl text-stone-900 dark:text-white">{monthYear}</h2>
                <div className="mt-4 space-y-3">
                  {entries.map((entry) => (
                    <DiaryListItem key={entry._id} diary={entry} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DiaryListPage;

