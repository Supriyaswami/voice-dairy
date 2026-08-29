import { api } from "./api";

export const diaryService = {
  uploadAudio: async (audioFile) => {
    const formData = new FormData();
    formData.append("audio", audioFile);

    const { data } = await api.post("/upload-audio", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return data;
  },

  transcribe: async (audioPath) => {
    const { data } = await api.post("/transcribe", { audioPath });
    return data;
  },

  generateDiary: async (transcript) => {
    const { data } = await api.post("/generate-diary", { transcript });
    return data;
  },

  saveDiary: async (payload) => {
    const { data } = await api.post("/save-diary", payload);
    return data;
  },

  getDiaries: async (query = "") => {
    const { data } = await api.get("/diaries", {
      params: { q: query }
    });
    return data;
  },

  getDiary: async (id) => {
    const { data } = await api.get(`/diary/${id}`);
    return data;
  },

  deleteDiary: async (id) => {
    const { data } = await api.delete(`/diary/${id}`);
    return data;
  }
};

