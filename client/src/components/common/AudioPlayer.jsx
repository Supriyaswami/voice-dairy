import { Download } from "lucide-react";
import Button from "./Button";

const AudioPlayer = ({ src, onDownload }) => (
  <div className="space-y-4 rounded-[1.75rem] border border-stone-200/80 bg-white/50 p-5 dark:border-white/10 dark:bg-white/5">
    <audio controls className="w-full">
      <source src={src} />
      Your browser does not support audio playback.
    </audio>
    <Button variant="secondary" className="w-full gap-2" onClick={onDownload}>
      <Download size={16} />
      Download Recording
    </Button>
  </div>
);

export default AudioPlayer;

