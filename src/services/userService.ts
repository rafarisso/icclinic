import { mockUser } from "@/data/mockUser";
import type { User } from "@/types";

const USE_MOCK = true;
const MOCK_DELAY = 180;

const wait = () => new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY));

export const userService = {
  async getCurrent(): Promise<User> {
    if (USE_MOCK) {
      await wait();
      return mockUser;
    }

    // TODO: buscar usuário autenticado no Supabase Auth e tabela de perfil.
    throw new Error("Backend não configurado");
  }
};
