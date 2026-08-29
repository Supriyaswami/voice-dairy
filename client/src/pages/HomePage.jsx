import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Play, Sparkles } from "lucide-react";
import AudioPlayer from "../components/common/AudioPlayer";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Loader from "../components/common/Loader";
import MicrophoneOrb from "../components/recording/MicrophoneOrb";
import RecordingControls from "../components/recording/RecordingControls";
import WaveformBars from "../components/recording/WaveformBars";
import { useClock } from "../hooks/useClock";
import { useRecorder } from "../hooks/useRecorder";
import { diaryService } from "../services/diaryService";
import { extractApiError } from "../services/api";
import { draftStorage } from "../utils/draftStorage";

const HomePage = () => {
  const navigate = useNavigate();
  const { day, date, time, greeting } = useClock();
  const recorder = useRecorder();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState("");
  const [requestError, setRequestError] = useState("");

  const recordedFile = useMemo(() => {
    if (!recorder.audioBlob) {
      return null;
    }

    return new File([recorder.audioBlob], `memory-${Date.now()}.webm`, {
      type: recorder.audioBlob.type || "audio/webm"
    });
  }, [recorder.audioBlob]);

  const processRecording = async () => {
    if (!recordedFile) {
      return;
    }

    setRequestError("");
    setIsProcessing(true);

    try {
      setProcessingStage("Uploading your voice...");
      const uploadResponse = await diaryService.uploadAudio(recordedFile);

      setProcessingStage("Transcribing your voice...");
      const transcriptResponse = await diaryService.transcribe(uploadResponse.audioPath);

      draftStorage.set({
        audioPath: uploadResponse.audioPath,
        audioUrl: uploadResponse.audioUrl,
        transcript: transcriptResponse.transcript,
        diary: "",
        day,
        date,
        time,
        createdAt: new Date().toISOString()
      });

      navigate("/transcript");
    } catch (error) {
      setRequestError(extractApiError(error, "We could not process your recording."));
    } finally {
      setIsProcessing(false);
      setProcessingStage("");
    }
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr,0.8fr]">
      <Card className="overflow-hidden p-0">
        <div className="bg-halo p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">{day}</p>
              <h2 className="mt-3 font-display text-5xl text-stone-900 dark:text-white">{greeting}</h2>
              <p className="mt-4 text-lg text-stone-600 dark:text-stone-300">{date}</p>
              <p className="mt-1 text-base text-stone-500 dark:text-stone-400">{time}</p>
            </div>
            <div className="rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm text-stone-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-stone-200">
              A private place to keep your day alive
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-12 max-w-2xl rounded-[2.5rem] border border-white/50 bg-white/60 px-6 py-10 text-center shadow-velvet backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">Record Today&apos;s Memory</p>
            <h1 className="mt-4 font-display text-4xl text-stone-900 dark:text-white md:text-5xl">
              Speak freely. We&apos;ll help shape it into a diary.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600 dark:text-stone-300">
              This is not a voice recorder or a notes app. It is your daily memory ritual, built to preserve what happened and how it felt.
            </p>

            <div className="mt-12 flex flex-col items-center">
              <MicrophoneOrb active={recorder.isRecording} onClick={!recorder.isRecording ? recorder.startRecording : undefined} />
              <p className="mt-6 text-base text-stone-600 dark:text-stone-300">
                {recorder.isRecording ? "Recording your memory..." : "Tap to start recording"}
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-[0.2em] text-stone-900 dark:text-white">
                {recorder.formattedDuration}
              </p>
              <div className="mt-6">
                <WaveformBars active={recorder.isRecording && !recorder.isPaused} />
              </div>
            </div>

            <div className="mt-8">
              <RecordingControls
                isRecording={recorder.isRecording}
                isPaused={recorder.isPaused}
                hasAudio={Boolean(recorder.audioUrl)}
                onPause={recorder.pauseRecording}
                onResume={recorder.resumeRecording}
                onStop={recorder.stopRecording}
                onDelete={recorder.deleteRecording}
              />
            </div>

            {recorder.permissionError && (
              <div className="mx-auto mt-6 flex max-w-lg items-center gap-3 rounded-[1.5rem] border border-rose-200 bg-rose-50 px-4 py-3 text-left text-sm text-rose-600 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200">
                <AlertCircle size={18} />
                {recorder.permissionError}
              </div>
            )}
          </motion.div>
        </div>
      </Card>

      <div className="space-y-4">
        <Card>
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">
            <Sparkles size={16} />
            Your Flow
          </div>
          <div className="mt-5 space-y-4">
            {[
              "Record the full story of your day in your own voice.",
              "Review and edit the transcript before the AI touches it.",
              "Refine the diary entry, then save both the writing and original audio."
            ].map((item, index) => (
              <div key={item} className="flex gap-4 rounded-[1.5rem] border border-stone-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm text-white dark:bg-white dark:text-stone-900">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-stone-700 dark:text-stone-200">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          {isProcessing ? (
            <Loader title={processingStage} subtitle="This can take a moment depending on your local AI services." />
          ) : recorder.audioUrl ? (
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-stone-900 dark:text-white">Your recording is ready</h3>
              <AudioPlayer src={recorder.audioUrl} onDownload={() => window.open(recorder.audioUrl, "_blank", "noopener")} />
              <Button className="w-full gap-2" onClick={processRecording}>
                <Play size={16} />
                Process Memory
              </Button>
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-stone-300 px-5 py-10 text-center dark:border-white/10">
              <h3 className="font-display text-2xl text-stone-900 dark:text-white">Quiet for now</h3>
              <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
                Once you stop recording, your playback and processing controls will appear here.
              </p>
            </div>
          )}

          {requestError && <p className="mt-4 text-sm text-rose-500">{requestError}</p>}
        </Card>
      </div>
    </div>
  );
};

export default HomePage;

