import { useMemo } from "react";
import { adminService } from "@/services/adminService";
import { useAsyncResource } from "@/hooks/useAsyncResource";

export const useAdminPatients = () =>
  useAsyncResource(() => adminService.getPatients(), []);

export const useAdminPatient = (patientId: string) =>
  useAsyncResource(
    () =>
      Promise.all([
        adminService.getPatientById(patientId),
        adminService.getPatientTimeline(patientId),
        adminService.getPatientPhotos(patientId),
        adminService.getPatientSimulations(patientId)
      ]).then(([patient, timeline, photos, simulations]) => ({
        patient,
        timeline,
        photos,
        simulations
      })),
    useMemo(() => [patientId], [patientId])
  );
