import { mockProcedures } from "@/data/mockProcedures";
import type { Procedure, ProcedureCategory } from "@/types";

const USE_MOCK = true;
const MOCK_DELAY = 220;

const wait = () => new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY));

export const procedureService = {
  async getAll(): Promise<Procedure[]> {
    if (USE_MOCK) {
      await wait();
      return mockProcedures;
    }

    // TODO: substituir por supabase.from("procedures").select("*").
    throw new Error("Backend não configurado");
  },

  async getById(id: string): Promise<Procedure | null> {
    if (USE_MOCK) {
      await wait();
      return mockProcedures.find((procedure) => procedure.id === id) ?? null;
    }

    // TODO: buscar procedimento por id no Supabase.
    throw new Error("Backend não configurado");
  },

  async getFeatured(): Promise<Procedure[]> {
    if (USE_MOCK) {
      await wait();
      return mockProcedures.filter((procedure) => procedure.featured);
    }

    // TODO: buscar procedimentos em destaque no Supabase.
    throw new Error("Backend não configurado");
  },

  async getByCategory(category: ProcedureCategory): Promise<Procedure[]> {
    if (USE_MOCK) {
      await wait();
      return mockProcedures.filter((procedure) => procedure.category === category);
    }

    // TODO: aplicar filtro por categoria no Supabase.
    throw new Error("Backend não configurado");
  }
};
