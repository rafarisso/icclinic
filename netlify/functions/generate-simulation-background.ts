import type { Config, Context } from "@netlify/functions";
import OpenAI, { toFile } from "openai";
import {
  buildSimulationPrompt,
  getProcedureLabels,
  normalizeIntensity,
  normalizeProcedures
} from "./_shared/simulationPrompt";
import {
  getSimulationJobStore,
  simulationJobKey
} from "./_shared/simulationJobs";

declare const Netlify: {
  env: {
    get: (name: string) => string | undefined;
  };
};

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const disclaimer =
  "Simulação ilustrativa. O resultado real depende de avaliação profissional da Dra. Camila Castro.";

function createMockSimulationUrl() {
  return "/mockups/simulation-result.jpg";
}

async function saveFailedJob(params: {
  jobId: string;
  selectedProcedures: string[];
  intensity: string;
  createdAt: string;
  error: string;
}) {
  const store = getSimulationJobStore();
  await store.setJSON(simulationJobKey(params.jobId), {
    status: "failed",
    selectedProcedures: params.selectedProcedures,
    intensity: params.intensity,
    disclaimer,
    error: params.error,
    createdAt: params.createdAt,
    completedAt: new Date().toISOString()
  });
}

export default async (req: Request, _context: Context) => {
  const formData = await req.formData();
  const jobId = String(formData.get("jobId") ?? "");
  const image = formData.get("image");
  const consent = formData.get("consent");
  const procedures = normalizeProcedures(formData.getAll("procedures").map(String));
  const intensity = normalizeIntensity(String(formData.get("intensity") ?? "natural"));
  const selectedProcedures = getProcedureLabels(procedures);
  const createdAt = new Date().toISOString();

  if (!jobId || consent !== "true" || !(image instanceof File)) {
    return new Response(null, { status: 202 });
  }

  if (image.size > MAX_IMAGE_SIZE_BYTES || procedures.length === 0) {
    await saveFailedJob({
      jobId,
      selectedProcedures,
      intensity,
      createdAt,
      error: "Dados inválidos para gerar a simulação."
    });
    return new Response(null, { status: 202 });
  }

  const store = getSimulationJobStore();
  const apiKey = Netlify.env.get("OPENAI_API_KEY");
  const model = Netlify.env.get("OPENAI_IMAGE_MODEL") || "gpt-image-2";

  if (!apiKey) {
    await store.setJSON(simulationJobKey(jobId), {
      status: "completed",
      simulatedImageUrl: createMockSimulationUrl(),
      selectedProcedures,
      intensity,
      disclaimer,
      mode: "mock",
      createdAt,
      completedAt: new Date().toISOString()
    });
    return new Response(null, { status: 202 });
  }

  try {
    const prompt = buildSimulationPrompt(procedures, intensity);
    const client = new OpenAI({ apiKey, timeout: 120000 });
    const imageFile = await toFile(
      await image.arrayBuffer(),
      image.name || "selfie.jpg",
      {
        type: image.type || "image/jpeg"
      }
    );

    const response = await client.images.edit({
      model,
      image: imageFile,
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "low",
      output_format: "jpeg"
    });

    const b64Json = response.data?.[0]?.b64_json;

    if (!b64Json) {
      throw new Error("Imagem não retornada pela API.");
    }

    await store.setJSON(simulationJobKey(jobId), {
      status: "completed",
      simulatedImageUrl: `data:image/jpeg;base64,${b64Json}`,
      selectedProcedures,
      intensity,
      disclaimer,
      mode: "openai",
      createdAt,
      completedAt: new Date().toISOString()
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("OpenAI image generation failed:", message);
    await saveFailedJob({
      jobId,
      selectedProcedures,
      intensity,
      createdAt,
      error: "Não foi possível gerar a simulação neste momento."
    });
  }

  return new Response(null, { status: 202 });
};

export const config: Config = {
  path: "/api/generate-simulation-background",
  method: ["POST"]
};
