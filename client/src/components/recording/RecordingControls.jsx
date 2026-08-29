import { Pause, Play, Square, Trash2 } from "lucide-react";
import Button from "../common/Button";

const RecordingControls = ({
  isRecording,
  isPaused,
  hasAudio,
  onPause,
  onResume,
  onStop,
  onDelete
}) => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    {isRecording && !isPaused && (
      <Button variant="secondary" className="gap-2" onClick={onPause}>
        <Pause size={16} />
        Pause
      </Button>
    )}

    {isRecording && isPaused && (
      <Button variant="secondary" className="gap-2" onClick={onResume}>
        <Play size={16} />
        Resume
      </Button>
    )}

    {isRecording && (
      <Button className="gap-2" onClick={onStop}>
        <Square size={16} />
        Stop
      </Button>
    )}

    {(isRecording || hasAudio) && (
      <Button variant="danger" className="gap-2" onClick={onDelete}>
        <Trash2 size={16} />
        Delete Recording
      </Button>
    )}
  </div>
);

export default RecordingControls;

