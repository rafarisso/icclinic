import { CalendarDays, Image, Sparkles, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoldButton } from "@/components/shared/GoldButton";
import { useAdminPatients } from "@/hooks/useAdminPatients";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { data: patients } = useAdminPatients();
  const totalPatients = patients?.length ?? 0;

  return (
    <div className="space-y-5 pt-1">
      <section>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ic-gold">
          Área interna
        </span>
        <h1 className="mt-2 font-serif text-[34px] font-medium leading-10 text-ic-black">
          Dashboard da clínica
        </h1>
        <p className="mt-1 text-[13px] leading-5 text-ic-gray-600">
          Base inicial para acompanhar pacientes, fotos autorizadas, simulações e
          etapas de tratamento.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {[
          { label: "Pacientes", value: totalPatients, icon: UsersRound },
          { label: "Simulações", value: 1, icon: Sparkles },
          { label: "Fotos", value: 2, icon: Image },
          { label: "Follow-ups", value: 1, icon: CalendarDays }
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

      <section className="rounded-ic-xl border border-ic-gold/25 bg-ic-cream-light p-4 shadow-ic-card">
        <h2 className="font-serif text-[24px] font-semibold leading-7">
          Próxima construção
        </h2>
        <p className="mt-2 text-[13px] leading-5 text-ic-gray-600">
          Esta área será protegida por autenticação e conectada ao Supabase na fase
          funcional, com consentimento e segurança para fotos de pacientes.
        </p>
      </section>

      <GoldButton className="w-full" onClick={() => navigate("/admin/pacientes")}>
        Ver pacientes
      </GoldButton>
    </div>
  );
}
