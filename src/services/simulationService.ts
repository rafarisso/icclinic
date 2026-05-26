import type {
  SimulationIntensity,
  SimulationProcedure,
  SimulationResult
} from "@/types";

const STORAGE_KEY = "ic-clinic-ai-simulation";

const procedureLabels: Record<SimulationProcedure, string> = {
  botox: "Botox",
  nariz: "Nariz",
  labios: "Lábios",
  limpeza: "Limpeza de pele"
};

interface ApiSimulationResponse {
  simulatedImageUrl: string;
  selectedProcedures: string[];
  intensity: SimulationIntensity;
  disclaimer: string;
  mode: "openai" | "mock";
}

function isSimulationIntensity(value: string): value is SimulationIntensity {
  return value === "natural" || value === "moderado" || value === "marcante";
}

function parseApiResponse(value: unknown): ApiSimulationResponse {
  if (!value || typeof value !== "object") {
    throw new Error("Resposta inválida da simulação.");
  }

  const record = value as Record<string, unknown>;
  const intensity = String(record.intensity ?? "natural");
  const mode = record.mode === "openai" ? "openai" : "mock";

  if (typeof record.simulatedImageUrl !== "string") {
    throw new Error("Imagem simulada não retornada.");
  }

  if (!Array.isArray(record.selectedProcedures)) {
    throw new Error("Procedimentos inválidos na resposta.");
  }

  return {
    simulatedImageUrl: record.simulatedImageUrl,
    selectedProcedures: record.selectedProcedures.map(String),
    intensity: isSimulationIntensity(intensity) ? intensity : "natural",
    disclaimer:
      typeof record.disclaimer === "string"
        ? record.disclaimer
        : "Simulação ilustrativa. O resultado real depende de avaliação profissional da Dra. Camila Castro.",
    mode
  };
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    reader.readAsDataURL(file);
  });
}

function createClientFallbackSimulation() {
  return "/mockups/simulation-result.jpg";
}

export const simulationService = {
  procedureLabels,

  async generate(params: {
    file: File;
    procedures: SimulationProcedure[];
    intensity: SimulationIntensity;
    consent: boolean;
  }): Promise<SimulationResult> {
    const originalImageUrl = await readFileAsDataUrl(params.file);
    const selectedProcedures = params.procedures.map(
      (procedure) => procedureLabels[procedure]
    );

    const formData = new FormData();
    formData.append("image", params.file);
    formData.append("intensity", params.intensity);
    formData.append("consent", String(params.consent));
    params.procedures.forEach((procedure) => formData.append("procedures", procedure));

    try {
      const response = await fetch("/api/generate-simulation", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as unknown;

      if (!response.ok) {
        const errorRecord = payload as Record<string, unknown>;
        throw new Error(String(errorRecord.error ?? "Erro ao gerar simulação."));
      }

      const data = parseApiResponse(payload);
      return {
        originalImageUrl,
        simulatedImageUrl: data.simulatedImageUrl,
        selectedProcedures: data.selectedProcedures,
        selectedProcedureIds: params.procedures,
        intensity: data.intensity,
        disclaimer: data.disclaimer,
        mode: data.mode,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      if (error instanceof SyntaxError) {
        return {
          originalImageUrl,
          simulatedImageUrl: createClientFallbackSimulation(),
          selectedProcedures,
          selectedProcedureIds: params.procedures,
          intensity: params.intensity,
          disclaimer:
            "Simulação ilustrativa. O resultado real depende de avaliação profissional da Dra. Camila Castro.",
          mode: "client-fallback",
          createdAt: new Date().toISOString()
        };
      }

      if (error instanceof Error && error.message !== "Failed to fetch") {
        throw error;
      }

      return {
        originalImageUrl,
        simulatedImageUrl: createClientFallbackSimulation(),
        selectedProcedures,
        selectedProcedureIds: params.procedures,
        intensity: params.intensity,
        disclaimer:
          "Simulação ilustrativa. O resultado real depende de avaliação profissional da Dra. Camila Castro.",
        mode: "client-fallback",
        createdAt: new Date().toISOString()
      };
    }
  },

  save(result: SimulationResult) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  },

  getLatest(): SimulationResult | null {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as SimulationResult;
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
  },

  clear() {
    window.sessionStorage.removeItem(STORAGE_KEY);
  }
};
