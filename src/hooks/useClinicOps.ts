import { adminService } from "@/services/adminService";
import { useAsyncResource } from "@/hooks/useAsyncResource";

export const useClinicAppointments = () =>
  useAsyncResource(() => adminService.getAppointments(), []);

export const useClinicInventory = () =>
  useAsyncResource(() => adminService.getInventory(), []);

export const useClinicTasks = () =>
  useAsyncResource(() => adminService.getTasks(), []);
