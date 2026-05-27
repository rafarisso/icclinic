import {
  mockClinicAppointments,
  mockClinicStats,
  mockClinicTasks,
  mockInventory
} from "@/data/mockClinicOps";
import {
  mockAISimulations,
  mockPatientPhotos,
  mockPatientTimeline,
  mockPatients
} from "@/data/mockPatients";
import type {
  AISimulationRecord,
  ClinicAppointment,
  ClinicStats,
  ClinicTask,
  InventoryItem,
  Patient,
  PatientPhoto,
  PatientTimelineItem
} from "@/types";

const USE_MOCK = true;
const MOCK_DELAY = 180;

const wait = () => new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY));

export const adminService = {
  async getPatients(): Promise<Patient[]> {
    if (USE_MOCK) {
      await wait();
      return mockPatients;
    }

    // TODO: substituir por Supabase com RLS e acesso interno da equipe.
    throw new Error("Backend não configurado");
  },

  async getPatientById(id: string): Promise<Patient | null> {
    if (USE_MOCK) {
      await wait();
      return mockPatients.find((patient) => patient.id === id) ?? null;
    }

    // TODO: buscar paciente por id no Supabase.
    throw new Error("Backend não configurado");
  },

  async getPatientTimeline(patientId: string): Promise<PatientTimelineItem[]> {
    if (USE_MOCK) {
      await wait();
      return mockPatientTimeline.filter((item) => item.patientId === patientId);
    }

    // TODO: buscar linha do tempo no Supabase.
    throw new Error("Backend não configurado");
  },

  async getPatientPhotos(patientId: string): Promise<PatientPhoto[]> {
    if (USE_MOCK) {
      await wait();
      return mockPatientPhotos.filter((photo) => photo.patientId === patientId);
    }

    // TODO: buscar fotos autorizadas no Supabase Storage.
    throw new Error("Backend não configurado");
  },

  async getPatientSimulations(patientId: string): Promise<AISimulationRecord[]> {
    if (USE_MOCK) {
      await wait();
      return mockAISimulations.filter(
        (simulation) => simulation.patientId === patientId
      );
    }

    // TODO: buscar histórico de simulações no Supabase.
    throw new Error("Backend não configurado");
  },

  async getAppointments(): Promise<ClinicAppointment[]> {
    if (USE_MOCK) {
      await wait();
      return mockClinicAppointments;
    }

    // TODO: buscar agenda interna no Supabase.
    throw new Error("Backend não configurado");
  },

  async getInventory(): Promise<InventoryItem[]> {
    if (USE_MOCK) {
      await wait();
      return mockInventory;
    }

    // TODO: buscar estoque no Supabase.
    throw new Error("Backend não configurado");
  },

  async getTasks(): Promise<ClinicTask[]> {
    if (USE_MOCK) {
      await wait();
      return mockClinicTasks;
    }

    // TODO: buscar tarefas operacionais no Supabase.
    throw new Error("Backend não configurado");
  },

  async getStats(): Promise<ClinicStats> {
    if (USE_MOCK) {
      await wait();
      return mockClinicStats;
    }

    // TODO: buscar eventos de acesso e simulações no Supabase ou analytics.
    throw new Error("Backend não configurado");
  }
};
