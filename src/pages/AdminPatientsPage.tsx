import { ChevronRight, Search, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminPatients } from "@/hooks/useAdminPatients";

const statusLabel = {
  active: "Ativa",
  follow_up: "Follow-up",
  planned: "Planejada"
};

export function AdminPatientsPage() {
  const navigate = useNavigate();
  const { data: patients, isLoading } = useAdminPatients();
  const [query, setQuery] = useState("");

  const filteredPatients = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("pt-BR");
    return (patients ?? []).filter((patient) =>
      patient.name.toLocaleLowerCase("pt-BR").includes(term)
    );
  }, [patients, query]);

  return (
    <div className="space-y-5 pt-1">
      <section>
        <h1 className="font-serif text-[34px] font-medium leading-10 text-ic-black">
          Pacientes
        </h1>
        <p className="mt-1 text-[13px] leading-5 text-ic-gray-600">
          Cadastro e acompanhamento inicial da jornada clínica.
        </p>
      </section>

      <label className="flex h-12 items-center gap-3 rounded-ic-md border border-ic-cream-dark bg-ic-cream-light px-4 shadow-ic-card">
        <Search size={18} className="text-ic-gold" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-ic-gray-400"
          placeholder="Buscar paciente"
          type="search"
        />
      </label>

      <section className="space-y-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[86px] rounded-ic-lg skeleton" />
            ))
          : filteredPatients.map((patient) => (
              <button
                type="button"
                key={patient.id}
                onClick={() => navigate(`/admin/pacientes/${patient.id}`)}
                className="flex w-full items-center gap-3 rounded-ic-lg bg-ic-cream-light p-4 text-left shadow-ic-card"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
                  <UserRound size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-[22px] font-semibold leading-6">
                    {patient.name}
                  </span>
                  <span className="mt-1 block text-[12px] text-ic-gray-600">
                    {patient.lastProcedure} · {statusLabel[patient.status]}
                  </span>
                </span>
                <ChevronRight size={18} className="text-ic-gray-400" />
              </button>
            ))}
      </section>
    </div>
  );
}
