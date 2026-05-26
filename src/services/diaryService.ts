import { mockDiary } from "@/data/mockDiary";
import type { Diary } from "@/types";

const USE_MOCK = true;
const MOCK_DELAY = 200;

const wait = () => new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY));

export const diaryService = {
  async getCurrent(): Promise<Diary> {
    if (USE_MOCK) {
      await wait();
      return mockDiary;
    }

    // TODO: buscar diário e imagens privadas via Supabase Storage.
    throw new Error("Backend não configurado");
  }
};
