import type {
  SimulationIntensity,
  SimulationProcedure,
  SimulationResult
} from "@/types";

const STORAGE_KEY = "ic-clinic-ai-simulation";
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const POLL_INTERVAL_MS = 2500;
const POLL_TIMEOUT_MS = 150000;

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

interface ApiJobCreatedResponse {
  jobId: string;
  status: "processing";
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

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function parseJobCreatedResponse(value: unknown): ApiJobCreatedResponse {
  if (!value || typeof value !== "object") {
    throw new Error("Resposta inválida da simulação.");
  }

  const record = value as Record<string, unknown>;

  if (typeof record.jobId !== "string" || record.jobId.length === 0) {
    throw new Error("Job de simulação não retornado.");
  }

  return {
    jobId: record.jobId,
    status: "processing"
  };
}

async function pollSimulationJob(jobId: string): Promise<ApiSimulationResponse> {
  const startedAt = Date.now();

  while (Date.now() - startedAt < POLL_TIMEOUT_MS) {
    await delay(POLL_INTERVAL_MS);

    const response = await fetch(`/api/simulation-status/${jobId}`, {
      method: "GET"
    });

    if (response.status === 404) {
      continue;
    }

    const payload = (await response.json()) as unknown;

    if (!response.ok) {
      const errorRecord = payload as Record<string, unknown>;
      throw new Error(String(errorRecord.error ?? "Erro ao consultar simulação."));
    }

    if (!payload || typeof payload !== "object") {
      throw new Error("Status inválido da simulação.");
    }

    const record = payload as Record<string, unknown>;
    const status = String(record.status ?? "processing");

    if (status === "completed") {
      return parseApiResponse(record);
    }

    if (status === "failed") {
      throw new Error(
        typeof record.error === "string"
          ? record.error
          : "Não foi possível gerar a simulação neste momento."
      );
    }
  }

  throw new Error("A simulação demorou mais que o esperado. Tente novamente.");
}

export const simulationService = {
  procedureLabels,

  async generate(params: {
    file: File;
    procedures: SimulationProcedure[];
    intensity: SimulationIntensity;
    consent: boolean;
  }): Promise<SimulationResult> {
    if (params.file.size > MAX_IMAGE_SIZE_BYTES) {
      throw new Error("A imagem precisa ter até 5 MB.");
    }

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

      const job = parseJobCreatedResponse(payload);
      const data = await pollSimulationJob(job.jobId);

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
