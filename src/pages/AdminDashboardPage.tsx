import {
  CalendarDays,
  ClipboardList,
  Eye,
  Image,
  PackageCheck,
  ScanFace,
  Sparkles,
  UsersRound
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoldButton } from "@/components/shared/GoldButton";
import { useAdminPatients } from "@/hooks/useAdminPatients";
import {
  useClinicAppointments,
  useClinicInventory,
  useClinicStats,
  useClinicTasks
} from "@/hooks/useClinicOps";
import { showToast } from "@/lib/toast";

const priorityLabel = {
  alta: "Alta",
  media: "Média",
  baixa: "Baixa"
};

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { data: patients } = useAdminPatients();
  const { data: appointments } = useClinicAppointments();
  const { data: inventory } = useClinicInventory();
  const { data: tasks } = useClinicTasks();
  const { data: stats } = useClinicStats();
  const totalPatients = patients?.length ?? 0;
  const pendingTasks = tasks?.length ?? 0;
  const lowStock = inventory?.filter((item) => item.status !== "ok").length ?? 0;
  const todayAppointments =
    appointments?.filter((appointment) => appointment.date === "2026-05-28").length ?? 0;
  const dailyAccesses = stats?.dailyAccesses ?? 0;
  const simulationsToday = stats?.simulationsToday ?? 0;
  const simulationsTotal = stats?.simulationsTotal ?? 0;
  const simulationConversionRate = stats?.simulationConversionRate ?? 0;

  return (
    <div className="space-y-5 pt-1">
      <section>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ic-gold">
          Área interna
        </span>
        <h1 className="mt-2 font-serif text-[34px] font-medium leading-10 text-ic-black">
          Painel IC Clinic
        </h1>
        <p className="mt-1 text-[13px] leading-5 text-ic-gray-600">
          Controle de agenda, pacientes, fotos autorizadas, simulações, estoque e
          próximos passos da jornada.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {[
          { label: "Acessos hoje", value: dailyAccesses, icon: Eye },
          { label: "Simulações hoje", value: simulationsToday, icon: ScanFace },
          { label: "Simulações total", value: simulationsTotal, icon: Sparkles },
          { label: "Pacientes", value: totalPatients, icon: UsersRound },
          { label: "Agenda hoje", value: todayAppointments, icon: CalendarDays },
          { label: "Estoque baixo", value: lowStock, icon: PackageCheck }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.label}
              className="rounded-ic-lg bg-ic-cream-light p-4 shadow-ic-card"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
                <Icon size={19} />
              </span>
              <p className="mt-4 font-serif text-[31px] font-semibold leading-8">
                {item.value}
              </p>
              <p className="text-[12px] text-ic-gray-600">{item.label}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-ic-xl border border-ic-gold/20 bg-ic-cream-light p-4 shadow-ic-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-[24px] font-semibold leading-7">
              Funil da simulação
            </h2>
            <p className="mt-1 text-[12px] leading-5 text-ic-gray-600">
              Acompanhamento das visitantes que chegam pela prévia com IA.
            </p>
          </div>
          <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-ic-gold/12 font-serif text-[24px] font-semibold text-ic-gold-dark">
            {simulationConversionRate}%
          </span>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <GoldButton className="w-full" onClick={() => navigate("/admin/pacientes")}>
          <UsersRound size={17} />
          Pacientes
        </GoldButton>
        <GoldButton className="w-full" onClick={() => navigate("/admin/agenda")}>
          <CalendarDays size={17} />
          Agenda
        </GoldButton>
      </section>

      <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-[25px] font-semibold leading-7">
            Agenda da clínica
          </h2>
          <CalendarDays size={18} className="text-ic-gold" />
        </div>
        <div className="space-y-2.5">
          {(appointments ?? []).slice(0, 3).map((appointment) => (
            <button
              type="button"
              key={appointment.id}
              onClick={() => navigate("/admin/agenda")}
              className="flex w-full items-center justify-between gap-3 rounded-ic-md border border-ic-cream-dark bg-ic-cream p-3 text-left"
            >
              <span>
                <span className="block text-sm font-semibold text-ic-black">
                  {appointment.time} · {appointment.patientName}
                </span>
                <span className="mt-1 block text-[12px] text-ic-gray-600">
                  {appointment.procedureName}
                </span>
              </span>
              <span className="rounded-ic-pill bg-ic-gold/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ic-gold-dark">
                {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-[25px] font-semibold leading-7">
            Pendências do dia
          </h2>
          <span className="flex items-center gap-2 rounded-ic-pill bg-ic-gold/12 px-3 py-1 text-[11px] font-semibold text-ic-gold-dark">
            <ClipboardList size={14} />
            {pendingTasks}
          </span>
        </div>
        <div className="space-y-2.5">
          {(tasks ?? []).map((task) => (
            <button
              type="button"
              key={task.id}
              onClick={() => showToast("Tarefa marcada como visualizada.")}
              className="flex w-full gap-3 rounded-ic-md border border-ic-cream-dark bg-ic-cream p-3 text-left"
            >
              <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-ic-gold" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ic-black">
                  {task.title}
                </span>
                <span className="mt-1 block text-[11px] uppercase tracking-[0.12em] text-ic-gray-600">
                  {priorityLabel[task.priority]} · {task.area}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-[25px] font-semibold leading-7">
            Estoque inteligente
          </h2>
          <PackageCheck size={18} className="text-ic-gold" />
        </div>
        <div className="space-y-2.5">
          {(inventory ?? []).map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => showToast("Reposição sinalizada para a equipe.")}
              className="flex w-full items-center justify-between gap-3 rounded-ic-md border border-ic-cream-dark bg-ic-cream p-3 text-left"
            >
              <span>
                <span className="block text-sm font-semibold text-ic-black">
                  {item.name}
                </span>
                <span className="mt-1 block text-[12px] text-ic-gray-600">
                  {item.quantity} {item.unit} em estoque
                </span>
              </span>
              <span
                className={
                  item.status === "ok"
                    ? "rounded-ic-pill bg-ic-success/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ic-success"
                    : "rounded-ic-pill bg-ic-warning/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ic-gold-dark"
                }
              >
                {item.status === "ok" ? "Ok" : "Repor"}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-ic-xl border border-ic-gold/25 bg-ic-charcoal p-4 text-ic-cream-light shadow-ic-elevated">
        <div className="flex gap-3">
          <Image size={21} className="mt-1 flex-none text-ic-gold" />
          <div>
            <h2 className="font-serif text-[24px] font-semibold leading-7">
              Banco clínico com LGPD
            </h2>
            <p className="mt-2 text-[13px] leading-5 text-ic-cream-light/75">
              A próxima fase conecta Supabase, autenticação interna, permissões e
              armazenamento seguro de fotos autorizadas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
