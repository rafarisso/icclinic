import { getStore } from "@netlify/blobs";

export type SimulationJob =
  | {
      status: "processing";
      selectedProcedures: string[];
      intensity: string;
      disclaimer: string;
      createdAt: string;
    }
  | {
      status: "completed";
      simulatedImageUrl: string;
      selectedProcedures: string[];
      intensity: string;
      disclaimer: string;
      mode: "openai" | "mock";
      createdAt: string;
      completedAt: string;
    }
  | {
      status: "failed";
      selectedProcedures: string[];
      intensity: string;
      disclaimer: string;
      error: string;
      createdAt: string;
      completedAt: string;
    };

export function getSimulationJobStore() {
  return getStore({ name: "ic-simulation-jobs", consistency: "strong" });
}

export function simulationJobKey(jobId: string) {
  return `jobs/${jobId}.json`;
}
