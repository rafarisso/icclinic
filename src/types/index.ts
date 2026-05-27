export type ProcedureCategory =
  | "Facial"
  | "Corporal"
  | "Capilar"
  | "Injetáveis";

export interface User {
  id: string;
  firstName: string;
  fullName: string;
  avatarUrl: string;
  points: number;
  memberSince: string;
  credits: number;
}

export interface Procedure {
  id: string;
  name: string;
  category: ProcedureCategory;
  description: string;
  duration: string;
  durationMinutes: number;
  priceFrom: number;
  imageUrl: string;
  badge?: string;
  featured: boolean;
  longDescription: string;
  idealFor: string[];
  benefits: string[];
  preparation: string[];
  aftercare: string[];
  recommendedInterval: string;
  maintenance: string;
  attention: string;
  nextSuggestions: string[];
}

export type JourneyStepStatus = "completed" | "in-progress" | "future";

export interface JourneyStep {
  id: string;
  name: string;
  description: string;
  status: JourneyStepStatus;
  thumbnailUrl: string;
  completedAt?: string;
}

export interface Journey {
  totalSteps: number;
  completedSteps: number;
  steps: JourneyStep[];
}

export interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

export interface Diary {
  beforePhotoUrl: string;
  afterPhotoUrl: string;
  entries: DiaryEntry[];
}

export interface Appointment {
  id: string;
  procedureId: string;
  procedureName: string;
  doctorName: string;
  date: string;
  time: string;
  imageUrl: string;
  status: "scheduled" | "completed" | "cancelled";
  location: string;
}

export interface ClinicAppointment {
  id: string;
  patientId: string;
  patientName: string;
  procedureId: string;
  procedureName: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: "confirmed" | "pending" | "done" | "cancelled";
  source: "app" | "clinic";
  notes: string;
}

export interface Notification {
  id: string;
  title: string;
  read: boolean;
}

export type SimulationProcedure = "botox" | "nariz" | "labios" | "limpeza";

export type SimulationIntensity = "natural" | "moderado" | "marcante";

export interface SimulationResult {
  originalImageUrl: string;
  simulatedImageUrl: string;
  selectedProcedures: string[];
  selectedProcedureIds: SimulationProcedure[];
  intensity: SimulationIntensity;
  disclaimer: string;
  mode: "openai" | "mock" | "client-fallback";
  createdAt: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  birthDate: string;
  createdAt: string;
  lastProcedure: string;
  status: "active" | "follow_up" | "planned";
}

export interface PatientPhoto {
  id: string;
  patientId: string;
  imageUrl: string;
  type: "original" | "before" | "after" | "simulation";
  consentGiven: boolean;
  createdAt: string;
}

export interface PatientTimelineItem {
  id: string;
  patientId: string;
  procedureId: string;
  procedureName: string;
  date: string;
  notes: string;
  status: "planned" | "done" | "follow_up";
  createdAt: string;
}

export interface AISimulationRecord {
  id: string;
  patientId?: string;
  originalImageUrl: string;
  simulatedImageUrl: string;
  selectedProcedures: string[];
  intensity: SimulationIntensity;
  disclaimerAccepted: boolean;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: "injetavel" | "skin-care" | "descartavel" | "equipamento";
  quantity: number;
  minimumQuantity: number;
  unit: string;
  status: "ok" | "low" | "critical";
  lastUpdated: string;
}

export interface ClinicTask {
  id: string;
  title: string;
  dueDate: string;
  priority: "alta" | "media" | "baixa";
  area: "agenda" | "paciente" | "estoque" | "financeiro";
}

export interface ClinicStats {
  dailyAccesses: number;
  simulationsToday: number;
  simulationsTotal: number;
  simulationConversionRate: number;
}
