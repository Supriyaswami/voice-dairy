const STORAGE_KEY = "echo-diary-draft";

export const draftStorage = {
  get() {
    const value = sessionStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  },
  set(draft) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  },
  clear() {
    sessionStorage.removeItem(STORAGE_KEY);
  }
};

