import type { Journey } from "@/types";

export const mockJourney: Journey = {
  totalSteps: 5,
  completedSteps: 4,
  steps: [
    {
      id: "step-1",
      name: "Avaliação inicial",
      description: "Consulta e plano personalizado",
      status: "completed",
      thumbnailUrl: "/mockups/journey-step-1.jpg",
      completedAt: "2026-01-15"
    },
    {
      id: "step-2",
      name: "Bioestimulador",
      description: "Estímulo de colágeno e firmeza",
      status: "completed",
      thumbnailUrl: "/mockups/journey-step-2.jpg",
      completedAt: "2026-02-12"
    },
    {
      id: "step-3",
      name: "Botox Full Face",
      description: "Harmonização e prevenção",
      status: "completed",
      thumbnailUrl: "/mockups/journey-step-3.jpg",
      completedAt: "2026-03-18"
    },
    {
      id: "step-4",
      name: "Skin Booster",
      description: "Hidratação profunda e viço",
      status: "in-progress",
      thumbnailUrl: "/mockups/journey-step-4.jpg"
    },
    {
      id: "step-5",
      name: "Manutenção",
      description: "Resultados duradouros",
      status: "future",
      thumbnailUrl: "/mockups/journey-step-5.jpg"
    }
  ]
};
