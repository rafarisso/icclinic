import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProcedureCard } from "@/components/shared/ProcedureCard";
import { MockImage } from "@/components/shared/MockImage";
import { useProcedures } from "@/hooks/useProcedures";
import type { ProcedureCategory } from "@/types";
import { cn } from "@/lib/utils";

const filters: Array<"Todos" | ProcedureCategory> = [
  "Todos",
  "Facial",
  "Corporal",
  "Capilar",
  "Injetáveis"
];

export function ProceduresPage() {
  const { data, isLoading } = useProcedures();
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Todos");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), 300);
    return () => window.clearTimeout(timer);
  }, [query]);

  const procedures = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLocaleLowerCase("pt-BR");
    return (data ?? []).filter((procedure) => {
      const matchesFilter =
        activeFilter === "Todos" || procedure.category === activeFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        procedure.name.toLocaleLowerCase("pt-BR").includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, data, debouncedQuery]);

  return (
    <div className="space-y-5 pt-1">
      <section>
        <h1 className="font-serif text-[34px] font-medium leading-10 text-ic-black">
          Procedimentos
        </h1>
        <p className="mt-1 text-[13px] leading-5 text-ic-gray-600">
          Protocolos personalizados para realçar sua beleza com naturalidade.
        </p>
      </section>

      <label className="flex h-12 items-center gap-3 rounded-ic-md border border-ic-cream-dark bg-ic-cream-light px-4 shadow-ic-card">
        <Search size={18} className="text-ic-gold" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-ic-gray-400"
          placeholder="Buscar procedimento"
          type="search"
        />
      </label>

      <div className="hide-scrollbar -mx-screen-px flex gap-2 overflow-x-auto px-screen-px">
        {filters.map((filter) => (
          <button
            type="button"
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "flex-none rounded-ic-pill border border-ic-gold/45 px-4 py-2 text-xs font-semibold transition-colors",
              activeFilter === filter
                ? "bg-ic-gold text-ic-white"
                : "bg-transparent text-ic-gold"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <section className="space-y-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-[142px] rounded-ic-lg skeleton" />
            ))
          : procedures.map((procedure) => (
              <ProcedureCard key={procedure.id} procedure={procedure} />
            ))}
      </section>

      <section className="relative overflow-hidden rounded-ic-xl bg-ic-charcoal p-5 shadow-ic-elevated">
        <MockImage
          label="Protocolos IC Clinic"
          className="absolute inset-y-0 right-0 w-32 rounded-none opacity-70"
        />
        <div className="relative max-w-[246px]">
          <h2 className="font-serif text-[25px] leading-7 text-ic-cream-light">
            Protocolos pensados para realçar sua beleza com naturalidade.
          </h2>
          <p className="mt-3 text-[12px] leading-5 text-ic-cream-light/72">
            Resultados acompanhados com exclusividade.
          </p>
        </div>
      </section>
    </div>
  );
}
