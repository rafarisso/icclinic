import type { ClinicAppointment, ClinicTask, InventoryItem } from "@/types";

export const mockClinicAppointments: ClinicAppointment[] = [
  {
    id: "clinic-appt-1",
    patientId: "patient-1",
    patientName: "Camila Mendes",
    procedureId: "proc-3",
    procedureName: "Skin Booster",
    date: "2026-05-28",
    time: "10:30",
    durationMinutes: 30,
    status: "confirmed",
    source: "app",
    notes: "Confirmar chegada 10 minutos antes. Paciente já fez bioestimulador."
  },
  {
    id: "clinic-appt-2",
    patientId: "patient-2",
    patientName: "Mariana Rocha",
    procedureId: "proc-1",
    procedureName: "Botox Full Face",
    date: "2026-05-28",
    time: "14:00",
    durationMinutes: 35,
    status: "pending",
    source: "clinic",
    notes: "Retoque de avaliação em 15 dias se necessário."
  },
  {
    id: "clinic-appt-3",
    patientId: "patient-3",
    patientName: "Renata Alves",
    procedureId: "proc-2",
    procedureName: "Bioestimulador de Colágeno",
    date: "2026-05-29",
    time: "15:30",
    durationMinutes: 55,
    status: "confirmed",
    source: "app",
    notes: "Solicitar fotos autorizadas antes do procedimento."
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: "stock-1",
    name: "Toxina botulínica",
    category: "injetavel",
    quantity: 6,
    minimumQuantity: 4,
    unit: "frascos",
    status: "ok",
    lastUpdated: "2026-05-25"
  },
  {
    id: "stock-2",
    name: "Ácido hialurônico labial",
    category: "injetavel",
    quantity: 2,
    minimumQuantity: 3,
    unit: "seringas",
    status: "low",
    lastUpdated: "2026-05-25"
  },
  {
    id: "stock-3",
    name: "Agulhas e cânulas",
    category: "descartavel",
    quantity: 18,
    minimumQuantity: 20,
    unit: "unidades",
    status: "low",
    lastUpdated: "2026-05-24"
  },
  {
    id: "stock-4",
    name: "Kit limpeza de pele",
    category: "skin-care",
    quantity: 9,
    minimumQuantity: 5,
    unit: "kits",
    status: "ok",
    lastUpdated: "2026-05-22"
  }
];

export const mockClinicTasks: ClinicTask[] = [
  {
    id: "task-1",
    title: "Confirmar agenda de quinta-feira no WhatsApp",
    dueDate: "2026-05-27",
    priority: "alta",
    area: "agenda"
  },
  {
    id: "task-2",
    title: "Pedir reposição de ácido hialurônico labial",
    dueDate: "2026-05-28",
    priority: "media",
    area: "estoque"
  },
  {
    id: "task-3",
    title: "Enviar orientação pós-procedimento para Camila Mendes",
    dueDate: "2026-05-28",
    priority: "alta",
    area: "paciente"
  },
  {
    id: "task-4",
    title: "Conferir pagamentos pendentes da semana",
    dueDate: "2026-05-29",
    priority: "baixa",
    area: "financeiro"
  }
];
