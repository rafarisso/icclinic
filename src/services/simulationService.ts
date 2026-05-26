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

function createClientFallbackSimulation(selectedProcedures: string[]) {
  const details = selectedProcedures.join(" + ");
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1280" viewBox="0 0 1024 1280">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FAF5EC"/>
      <stop offset="0.52" stop-color="#E8DCC8"/>
      <stop offset="1" stop-color="#B89968"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1280" fill="url(#bg)"/>
  <ellipse cx="512" cy="505" rx="235" ry="305" fill="#D8BFA5" opacity="0.92"/>
  <path d="M326 468 C356 336 438 270 512 270 C598 270 668 345 698 468 C662 402 604 374 512 374 C420 374 362 402 326 468Z" fill="#2D2620" opacity="0.84"/>
  <ellipse cx="430" cy="520" rx="22" ry="15" fill="#2D2620" opacity="0.62"/>
  <ellipse cx="594" cy="520" rx="22" ry="15" fill="#2D2620" opacity="0.62"/>
  <path d="M512 530 C496 586 490 620 512 638 C536 620 528 586 512 530Z" fill="none" stroke="#8B6F47" stroke-width="10" stroke-linecap="round" opacity="0.56"/>
  <path d="M438 700 C484 732 544 732 586 700" fill="none" stroke="#A66F6A" stroke-width="22" stroke-linecap="round" opacity="0.72"/>
  <text x="512" y="940" text-anchor="middle" font-family="Georgia, serif" font-size="64" fill="#2D2620">Simulação com IA</text>
  <text x="512" y="1008" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#6B6258">${details}</text>
  <text x="512" y="1068" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#8B6F47">Prévia ilustrativa, natural e sutil</text>
</svg>`.trim();

  return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svg)))}`;
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
          simulatedImageUrl: createClientFallbackSimulation(selectedProcedures),
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
        simulatedImageUrl: createClientFallbackSimulation(selectedProcedures),
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
