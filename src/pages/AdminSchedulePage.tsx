import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Plus,
  UserPlus
} from "lucide-react";
import { useState } from "react";
import { GoldButton } from "@/components/shared/GoldButton";
import { useClinicAppointments } from "@/hooks/useClinicOps";
import { showToast } from "@/lib/toast";
import { openWhatsApp } from "@/lib/whatsapp";

const statusLabel = {
  confirmed: "Confirmado",
  pending: "Pendente",
  done: "Realizado",
  cancelled: "Cancelado"
};

export function AdminSchedulePage() {
  const { data: appointments, isLoading } = useClinicAppointments();
  const [patientName, setPatientName] = useState("");
  const [procedureName, setProcedureName] = useState("Skin Booster");
  const [date, setDate] = useState("2026-05-30");
  const [time, setTime] = useState("10:30");

  const handleCreateAppointment = () => {
    if (!patientName.trim()) {
      showToast("Informe o nome da paciente para criar o agendamento.");
      return;
    }

    showToast("Agendamento interno criado.");
    setPatientName("");
  };

  return (
    <div className="space-y-5 pt-1">
      <section>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ic-gold">
          Operação
        </span>
        <h1 className="mt-2 font-serif text-[34px] font-medium leading-10 text-ic-black">
          Agenda da clínica
        </h1>
        <p className="mt-1 text-[13px] leading-5 text-ic-gray-600">
          A equipe pode confirmar horários vindos do app ou criar agendamentos
          manualmente pelo painel.
        </p>
      </section>

      <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-[25px] font-semibold leading-7">
            Novo agendamento
          </h2>
          <Plus size={18} className="text-ic-gold" />
        </div>
        <div className="space-y-3">
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ic-gold">
              Paciente
            </span>
            <input
              value={patientName}
              onChange={(event) => setPatientName(event.target.value)}
              placeholder="Nome da paciente"
              className="mt-1 h-11 w-full rounded-ic-md border border-ic-cream-dark bg-ic-cream px-3 text-sm outline-none focus:border-ic-gold"
            />
          </label>
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ic-gold">
              Procedimento
            </span>
            <select
              value={procedureName}
              onChange={(event) => setProcedureName(event.target.value)}
              className="mt-1 h-11 w-full rounded-ic-md border border-ic-cream-dark bg-ic-cream px-3 text-sm outline-none focus:border-ic-gold"
            >
              <option>Skin Booster</option>
              <option>Botox Full Face</option>
              <option>Bioestimulador de Colágeno</option>
              <option>Preenchimento Labial</option>
              <option>Limpeza de Pele Profunda</option>
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ic-gold">
                Data
              </span>
              <input
                value={date}
                onChange={(event) => setDate(event.target.value)}
                type="date"
                className="mt-1 h-11 w-full rounded-ic-md border border-ic-cream-dark bg-ic-cream px-3 text-sm outline-none focus:border-ic-gold"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ic-gold">
                Hora
              </span>
              <input
                value={time}
                onChange={(event) => setTime(event.target.value)}
                type="time"
                className="mt-1 h-11 w-full rounded-ic-md border border-ic-cream-dark bg-ic-cream px-3 text-sm outline-none focus:border-ic-gold"
              />
            </label>
          </div>
          <GoldButton className="w-full" onClick={handleCreateAppointment}>
            <UserPlus size={17} />
            Criar agendamento
          </GoldButton>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-[25px] font-semibold leading-7">
          Próximos horários
        </h2>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[116px] rounded-ic-lg skeleton" />
            ))
          : appointments?.map((appointment) => (
              <article
                key={appointment.id}
                className="rounded-ic-lg bg-ic-cream-light p-4 shadow-ic-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-serif text-[23px] font-semibold leading-7">
                      {appointment.patientName}
                    </p>
                    <p className="mt-1 text-[13px] leading-5 text-ic-gray-600">
                      {appointment.procedureName}
                    </p>
                  </div>
                  <span className="rounded-ic-pill bg-ic-gold/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ic-gold-dark">
                    {statusLabel[appointment.status]}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-[12px] font-semibold text-ic-gray-600">
                  <span className="flex items-center gap-1 rounded-ic-pill bg-ic-cream px-3 py-1.5">
                    <CalendarDays size={14} className="text-ic-gold" />
                    {appointment.date}
                  </span>
                  <span className="flex items-center gap-1 rounded-ic-pill bg-ic-cream px-3 py-1.5">
                    <Clock3 size={14} className="text-ic-gold" />
                    {appointment.time}
                  </span>
                </div>
                <p className="mt-3 text-[12px] leading-5 text-ic-gray-600">
                  {appointment.notes}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <GoldButton
                    type="button"
                    variant="outline"
                    className="h-10 min-h-10 px-3 text-xs"
                    onClick={() => showToast("Horário confirmado.")}
                  >
                    <CheckCircle2 size={15} />
                    Confirmar
                  </GoldButton>
                  <GoldButton
                    type="button"
                    className="h-10 min-h-10 px-3 text-xs"
                    onClick={() =>
                      openWhatsApp(
                        `Olá! Passando para confirmar seu horário de ${appointment.procedureName} na IC Clinic.`
                      )
                    }
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </GoldButton>
                </div>
              </article>
            ))}
      </section>
    </div>
  );
}
