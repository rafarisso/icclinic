import { mockAppointments, mockNextAppointment } from "@/data/mockAppointments";
import type { Appointment } from "@/types";

const USE_MOCK = true;
const MOCK_DELAY = 200;

const wait = () => new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY));

export const appointmentService = {
  async getNext(): Promise<Appointment> {
    if (USE_MOCK) {
      await wait();
      return mockNextAppointment;
    }

    // TODO: buscar próximo agendamento no Supabase.
    throw new Error("Backend não configurado");
  },

  async getAll(): Promise<Appointment[]> {
    if (USE_MOCK) {
      await wait();
      return mockAppointments;
    }

    // TODO: buscar agendamentos no Supabase.
    throw new Error("Backend não configurado");
  }
};
