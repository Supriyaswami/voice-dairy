import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "../components/common/AudioPlayer";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import EmptyState from "../components/common/EmptyState";
import TextArea from "../components/common/TextArea";
import { draftStorage } from "../utils/draftStorage";
import { diaryService } from "../services/diaryService";
import { extractApiError } from "../services/api";

const TranscriptPage = () => {
  const navigate = useNavigate();
  const draft = draftStorage.get();
  const [transcript, setTranscript] = useState(draft?.transcript || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const stats = useMemo(() => {
    const trimmed = transcript.trim();
    return {
      words: trimmed ? trimmed.split(/\s+/).length : 0,
      characters: transcript.length
    };
  }, [transcript]);

  if (!draft) {
    return <EmptyState title="No transcript yet" description="Record a memory first, then your transcript will appear here for editing." />;
  }

  const handleGenerateDiary = async () => {
    setIsGenerating(true);
    setError("");

    try {
      const response = await diaryService.generateDiary(transcript);
      draftStorage.set({
        ...draft,
        transcript,
        diary: response.diary
      });

      navigate("/generated-diary");
    } catch (requestError) {
      setError(extractApiError(requestError, "We could not generate your diary."));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr,1.1fr]">
      <Card className="space-y-5">
        <h2 className="font-display text-3xl text-stone-900 dark:text-white">Raw Transcript</h2>
        <p className="text-sm leading-7 text-stone-600 dark:text-stone-300">
          Review every detail before the AI rewrites your words. This is where factual accuracy is protected.
        </p>
        <AudioPlayer src={draft.audioUrl} onDownload={() => window.open(draft.audioUrl, "_blank", "noopener")} />
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[1.5rem] border border-stone-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">Word Count</p>
            <p className="mt-2 text-2xl font-semibold text-stone-900 dark:text-white">{stats.words}</p>
          </div>
          <div className="rounded-[1.5rem] border border-stone-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">Character Count</p>
            <p className="mt-2 text-2xl font-semibold text-stone-900 dark:text-white">{stats.characters}</p>
          </div>
        </div>
      </Card>

      <Card className="space-y-5">
        <TextArea
          label="Editable Transcript"
          value={transcript}
          onChange={(event) => setTranscript(event.target.value)}
          placeholder="Your transcript will appear here..."
          className="min-h-[430px]"
        />
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => navigate("/")}>
            Record Again
          </Button>
          <Button onClick={handleGenerateDiary} disabled={isGenerating || !transcript.trim()}>
            {isGenerating ? "Writing your diary..." : "Generate Diary"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TranscriptPage;

