import axios from "axios";
import { env } from "../../config/env.js";
import { AppError } from "../../utils/appError.js";

const buildDiaryPrompt = (transcript) => `
You are an editor for a private diary.

Your job is to rewrite the transcript into a polished diary entry while preserving every fact exactly.

Strict rules:
- Do not invent facts.
- Do not invent people.
- Do not invent places.
- Do not change names.
- Do not add dialogue.
- Do not add events that were not mentioned.
- Keep first-person narration.
- Preserve emotional tone.
- Improve grammar, punctuation, clarity, and flow.
- Arrange events in a natural order only if that does not change the facts.

Return only the final diary entry with no title and no explanation.

Transcript:
${transcript}
`;

export const generateDiaryFromTranscript = async (transcript) => {
  try {
    const response = await axios.post(
      env.ollamaApiUrl,
      {
        model: env.ollamaModel,
        prompt: buildDiaryPrompt(transcript),
        stream: false
      },
      {
        timeout: 1000 * 60 * 3
      }
    );

    const diaryText = response.data?.response?.trim();
    if (!diaryText) {
      throw new AppError("The diary generation service returned an empty response.", 502);
    }

    return diaryText;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Diary generation failed. Make sure Ollama is running and reachable.", 502);
  }
};

