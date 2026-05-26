import type { Config, Context } from "@netlify/functions";
import {
  getSimulationJobStore,
  type SimulationJob,
  simulationJobKey
} from "./_shared/simulationJobs";

interface ErrorResponse {
  error: string;
}

function jsonResponse(body: SimulationJob | ErrorResponse, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

export default async (_req: Request, context: Context) => {
  const jobId = context.params.jobId;

  if (!jobId) {
    return jsonResponse({ error: "Job inválido." }, 400);
  }

  const store = getSimulationJobStore();
  const job = (await store.get(simulationJobKey(jobId), {
    type: "json"
  })) as SimulationJob | null;

  if (!job) {
    return jsonResponse({ error: "Simulação não encontrada." }, 404);
  }

  return jsonResponse(job);
};

export const config: Config = {
  path: "/api/simulation-status/:jobId",
  method: ["GET"]
};
