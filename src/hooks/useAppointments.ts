import { appointmentService } from "@/services/appointmentService";
import { useAsyncResource } from "@/hooks/useAsyncResource";

export const useNextAppointment = () =>
  useAsyncResource(() => appointmentService.getNext(), []);

export const useAppointments = () =>
  useAsyncResource(() => appointmentService.getAll(), []);
