import { useEffect, useMemo, useRef, useState } from "react";

const getSupportedMimeType = () => {
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];

  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) || "";
};

export const useRecorder = () => {
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const intervalRef = useRef(null);

  const [permissionError, setPermissionError] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");

  const resetTimer = () => {
    window.clearInterval(intervalRef.current);
    intervalRef.current = null;
    setElapsedSeconds(0);
  };

  const startTimer = () => {
    window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);
  };

  const cleanupStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  useEffect(() => {
    return () => {
      cleanupStream();
      window.clearInterval(intervalRef.current);
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    setPermissionError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getSupportedMimeType();
      const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      chunksRef.current = [];
      setAudioBlob(null);
      setAudioUrl("");
      setElapsedSeconds(0);
      streamRef.current = stream;
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType || "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        cleanupStream();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      startTimer();
    } catch (error) {
      setPermissionError("Microphone access is required to record your memory.");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      window.clearInterval(intervalRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current?.state === "paused") {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      startTimer();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      window.clearInterval(intervalRef.current);
    }
  };

  const deleteRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }

    cleanupStream();
    resetTimer();
    setIsRecording(false);
    setIsPaused(false);
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl("");
    }
  };

  const formattedDuration = useMemo(() => {
    const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
    const seconds = String(elapsedSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [elapsedSeconds]);

  return {
    permissionError,
    isRecording,
    isPaused,
    audioBlob,
    audioUrl,
    elapsedSeconds,
    formattedDuration,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    deleteRecording
  };
};

