import type {
  AISimulationRecord,
  Patient,
  PatientPhoto,
  PatientTimelineItem
} from "@/types";

export const mockPatients: Patient[] = [
  {
    id: "patient-1",
    name: "Camila Mendes",
    phone: "+55 11 95580-6333",
    email: "camila.mendes@email.com",
    birthDate: "1988-05-12",
    createdAt: "2025-03-15",
    lastProcedure: "Skin Booster",
    status: "active"
  },
  {
    id: "patient-2",
    name: "Mariana Rocha",
    phone: "+55 11 94444-2211",
    email: "mariana.rocha@email.com",
    birthDate: "1991-08-04",
    createdAt: "2025-11-02",
    lastProcedure: "Botox Full Face",
    status: "follow_up"
  },
  {
    id: "patient-3",
    name: "Renata Alves",
    phone: "+55 11 93333-1100",
    email: "renata.alves@email.com",
    birthDate: "1982-02-21",
    createdAt: "2026-01-19",
    lastProcedure: "Bioestimulador",
    status: "planned"
  }
];

export const mockPatientPhotos: PatientPhoto[] = [
  {
    id: "photo-1",
    patientId: "patient-1",
    imageUrl: "/mockups/diary-before.jpg",
    type: "before",
    consentGiven: true,
    createdAt: "2026-04-12"
  },
  {
    id: "photo-2",
    patientId: "patient-1",
    imageUrl: "/mockups/diary-after.jpg",
    type: "after",
    consentGiven: true,
    createdAt: "2026-05-10"
  }
];

export const mockPatientTimeline: PatientTimelineItem[] = [
  {
    id: "timeline-1",
    patientId: "patient-1",
    procedureId: "proc-2",
    procedureName: "Bioestimulador",
    date: "2026-02-12",
    notes: "Estímulo de colágeno e firmeza com boa evolução.",
    status: "done",
    createdAt: "2026-02-12"
  },
  {
    id: "timeline-2",
    patientId: "patient-1",
    procedureId: "proc-1",
    procedureName: "Botox Full Face",
    date: "2026-03-18",
    notes: "Resultado natural, expressão preservada.",
    status: "done",
    createdAt: "2026-03-18"
  },
  {
    id: "timeline-3",
    patientId: "patient-1",
    procedureId: "proc-3",
    procedureName: "Skin Booster",
    date: "2026-05-24",
    notes: "Próxima etapa para qualidade de pele e viço.",
    status: "planned",
    createdAt: "2026-05-20"
  }
];

export const mockAISimulations: AISimulationRecord[] = [
  {
    id: "sim-1",
    patientId: "patient-1",
    originalImageUrl: "/mockups/diary-before.jpg",
    simulatedImageUrl: "/mockups/diary-after.jpg",
    selectedProcedures: ["Limpeza de pele", "Lábios"],
    intensity: "natural",
    disclaimerAccepted: true,
    createdAt: "2026-05-22"
  }
];
