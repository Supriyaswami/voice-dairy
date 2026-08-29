import { useState } from "react";
import { Copy, Download, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import EmptyState from "../components/common/EmptyState";
import TextArea from "../components/common/TextArea";
import { diaryService } from "../services/diaryService";
import { extractApiError } from "../services/api";
import { draftStorage } from "../utils/draftStorage";
import { downloadTextFile } from "../utils/file";
import { useAuth } from "../context/AuthContext";

const GeneratedDiaryPage = () => {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const draft = draftStorage.get();
  const [diary, setDiary] = useState(draft?.diary || "");
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  if (!draft) {
    return <EmptyState title="No draft available" description="Generate a transcript and diary first, then you can refine and save it here." />;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(diary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    downloadTextFile(diary, `echo-diary-${draft.date}.txt`);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");

    try {
      const response = await diaryService.saveDiary({
        audioPath: draft.audioPath,
        transcript: draft.transcript,
        diary,
        day: draft.day,
        date: draft.date,
        time: draft.time
      });

      draftStorage.clear();
      await refreshProfile();
      navigate(`/diaries/${response.diary._id}`);
    } catch (requestError) {
      setError(extractApiError(requestError, "We could not save your diary."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[0.8fr,1.2fr]">
      <Card className="space-y-5">
        <h2 className="font-display text-3xl text-stone-900 dark:text-white">Beautifully Written Diary</h2>
        <p className="text-sm leading-7 text-stone-600 dark:text-stone-300">
          The AI has refined your transcript into diary writing while keeping the facts intact. You can still edit it before saving.
        </p>
        <div className="grid gap-3">
          <Button variant="secondary" className="gap-2" onClick={handleCopy}>
            <Copy size={16} />
            {copied ? "Copied" : "Copy to Clipboard"}
          </Button>
          <Button variant="secondary" className="gap-2" onClick={handleDownload}>
            <Download size={16} />
            Download as TXT
          </Button>
          <Button className="gap-2" onClick={handleSave} disabled={isSaving || !diary.trim()}>
            <Save size={16} />
            {isSaving ? "Saving..." : "Save Diary"}
          </Button>
        </div>
        {error && <p className="text-sm text-rose-500">{error}</p>}
      </Card>

      <Card>
        <TextArea
          label="Editable Diary Entry"
          value={diary}
          onChange={(event) => setDiary(event.target.value)}
          className="min-h-[540px] font-display text-base leading-8"
        />
      </Card>
    </div>
  );
};

export default GeneratedDiaryPage;

