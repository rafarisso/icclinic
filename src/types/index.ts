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

export interface Notification {
  id: string;
  title: string;
  read: boolean;
}
