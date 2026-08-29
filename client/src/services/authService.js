import { api } from "./api";

export const authService = {
  register: async (payload) => {
    const { data } = await api.post("/register", payload);
    return data;
  },
  login: async (payload) => {
    const { data } = await api.post("/login", payload);
    return data;
  },
  profile: async () => {
    const { data } = await api.get("/profile");
    return data;
  }
};

