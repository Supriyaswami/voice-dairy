import dayjs from "dayjs";

export const getDiaryDateMeta = (dateInput = new Date()) => {
  const date = dayjs(dateInput);

  return {
    day: date.format("dddd"),
    date: date.format("D MMMM YYYY"),
    time: date.format("h:mm A")
  };
};

export const getDiaryTitle = ({ transcript, date }) => {
  const firstSentence = transcript
    .split(/[.!?]/)
    .map((sentence) => sentence.trim())
    .find(Boolean);

  if (!firstSentence) {
    return `Memory from ${date}`;
  }

  const trimmed = firstSentence.slice(0, 60);
  return trimmed.length < firstSentence.length ? `${trimmed}...` : trimmed;
};

