import type { Appointment } from "@/types";

export const mockNextAppointment: Appointment = {
  id: "apt-1",
  procedureId: "proc-3",
  procedureName: "Skin Booster",
  doctorName: "Dra. Camila Castro",
  date: "2026-05-24",
  time: "10:00",
  imageUrl: "/mockups/skin-booster.jpg",
  status: "scheduled",
  location:
    "IC Clinic, Av. Manuel Alves Soares, 437, sala 4, Parque Colonial, São Paulo"
};

export const mockAppointments: Appointment[] = [
  mockNextAppointment,
  {
    id: "apt-2",
    procedureId: "proc-1",
    procedureName: "Botox Full Face",
    doctorName: "Dra. Camila Castro",
    date: "2026-03-18",
    time: "11:30",
    imageUrl: "/mockups/proc-botox.jpg",
    status: "completed",
    location:
      "IC Clinic, Av. Manuel Alves Soares, 437, sala 4, Parque Colonial, São Paulo"
  },
  {
    id: "apt-3",
    procedureId: "proc-2",
    procedureName: "Bioestimulador",
    doctorName: "Dra. Camila Castro",
    date: "2026-02-12",
    time: "15:00",
    imageUrl: "/mockups/proc-bioestim.jpg",
    status: "completed",
    location:
      "IC Clinic, Av. Manuel Alves Soares, 437, sala 4, Parque Colonial, São Paulo"
  }
];
