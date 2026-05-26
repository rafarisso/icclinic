import type { Config, Context } from "@netlify/functions";
import {
  getProcedureLabels,
  normalizeIntensity,
  normalizeProcedures
} from "./_shared/simulationPrompt";
import {
  getSimulationJobStore,
  simulationJobKey
} from "./_shared/simulationJobs";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

interface JobCreatedResponse {
  jobId: string;
  status: "processing";
}

interface ErrorResponse {
  error: string;
}

const disclaimer =
  "Simulação ilustrativa. O resultado real depende de avaliação profissional da Dra. Camila Castro.";

function jsonResponse(body: JobCreatedResponse | ErrorResponse, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

function createJobId() {
  return crypto.randomUUID();
}

export default async (req: Request, _context: Context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Método não permitido." }, 405);
  }

  const formData = await req.formData();
  const image = formData.get("image");
  const consent = formData.get("consent");
  const procedures = normalizeProcedures(formData.getAll("procedures").map(String));
  const intensity = normalizeIntensity(String(formData.get("intensity") ?? "natural"));

  if (consent !== "true") {
    return jsonResponse(
      {
        error:
          "É necessário autorizar o uso da imagem para gerar a simulação ilustrativa."
      },
      400
    );
  }

  if (!(image instanceof File)) {
    return jsonResponse({ error: "Envie uma selfie para gerar a simulação." }, 400);
  }

  if (image.size > MAX_IMAGE_SIZE_BYTES) {
    return jsonResponse({ error: "A imagem precisa ter até 5 MB." }, 400);
  }

  if (procedures.length === 0) {
    return jsonResponse({ error: "Selecione ao menos um procedimento." }, 400);
  }

  const jobId = createJobId();
  const selectedProcedures = getProcedureLabels(procedures);
  const store = getSimulationJobStore();
  const createdAt = new Date().toISOString();

  await store.setJSON(simulationJobKey(jobId), {
    status: "processing",
    selectedProcedures,
    intensity,
    disclaimer,
    createdAt
  });

  const backgroundFormData = new FormData();
  backgroundFormData.append("jobId", jobId);
  backgroundFormData.append("image", image);
  backgroundFormData.append("intensity", intensity);
  backgroundFormData.append("consent", "true");
  procedures.forEach((procedure) =>
    backgroundFormData.append("procedures", procedure)
  );

  const backgroundUrl = new URL("/api/generate-simulation-background", req.url);
  await fetch(backgroundUrl, {
    method: "POST",
    body: backgroundFormData
  });

  return jsonResponse({ jobId, status: "processing" }, 202);
};

export const config: Config = {
  path: "/api/generate-simulation",
  method: ["POST", "OPTIONS"]
};
