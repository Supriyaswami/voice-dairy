import { localStorageService } from "./localStorageService.js";

export const storageService = {
  ensureUploadsDirectory: () => localStorageService.ensureUploadsDirectory(),
  deleteAudio: (audioPath) => localStorageService.deleteAudio(audioPath),
  getAudioUrl: (req, audioPath) => localStorageService.getAudioUrl(req, audioPath)
};

