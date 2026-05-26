import { mockJourney } from "@/data/mockJourney";
import type { Journey } from "@/types";

const USE_MOCK = true;
const MOCK_DELAY = 200;

const wait = () => new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY));

export const journeyService = {
  async getCurrent(): Promise<Journey> {
    if (USE_MOCK) {
      await wait();
      return mockJourney;
    }

    // TODO: buscar jornada personalizada no Supabase.
    throw new Error("Backend não configurado");
  }
};
