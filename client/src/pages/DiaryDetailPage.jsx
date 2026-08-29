import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AudioPlayer from "../components/common/AudioPlayer";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Loader from "../components/common/Loader";
import DiaryPaper from "../components/diary/DiaryPaper";
import { diaryService } from "../services/diaryService";
import { extractApiError } from "../services/api";
import { downloadFromUrl } from "../utils/file";

const DiaryDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchDiary = async () => {
      try {
        setIsLoading(true);
        const response = await diaryService.getDiary(id);
        if (!ignore) {
          setEntry(response.diary);
        }
      } catch (requestError) {
        if (!ignore) {
          setError(extractApiError(requestError, "We could not open this diary."));
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchDiary();

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      await diaryService.deleteDiary(id);
      navigate("/diaries");
    } catch (requestError) {
      setError(extractApiError(requestError, "We could not delete this diary."));
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <Loader title="Opening your diary..." subtitle="Preparing the page and original recording." />;
  }

  if (error) {
    return <Card><p className="text-sm text-rose-500">{error}</p></Card>;
  }

  if (!entry) {
    return <Card><p className="text-sm text-stone-600 dark:text-stone-300">Diary not found.</p></Card>;
  }

  return (
    <div className="space-y-4">
      <DiaryPaper day={entry.day} date={entry.date} time={entry.time} content={entry.diary}>
        <AudioPlayer src={entry.audioUrl} onDownload={() => downloadFromUrl(entry.audioUrl, `${entry.date}.webm`)} />
      </DiaryPaper>

      <Card className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => navigate("/diaries")}>
          Back to Diaries
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete Diary"}
        </Button>
      </Card>
    </div>
  );
};

export default DiaryDetailPage;

