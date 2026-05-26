import { Flower2 } from "lucide-react";
import { JourneyStep } from "@/components/shared/JourneyStep";
import { MockImage } from "@/components/shared/MockImage";
import { Progress } from "@/components/ui/progress";
import { useJourney } from "@/hooks/useJourney";

export function JourneyPage() {
  const { data, isLoading } = useJourney();
  const progress = data ? Math.round((data.completedSteps / data.totalSteps) * 100) : 0;

  return (
    <div className="space-y-5 pt-1">
      <section>
        <h1 className="font-serif text-[34px] font-medium leading-10 text-ic-black">
          Minha Jornada
        </h1>
        <p className="mt-1 text-[13px] leading-5 text-ic-gray-600">
          Seu protocolo personalizado com Dra. Camila Castro
        </p>
      </section>

      <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-ic-black">
            {data?.completedSteps ?? 0} de {data?.totalSteps ?? 0} etapas concluídas
          </span>
          <span className="text-[13px] font-semibold text-ic-gold">{progress}%</span>
        </div>
        <Progress value={progress} />
      </section>

      <section>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="mb-4 h-[104px] rounded-ic-lg skeleton" />
            ))
          : data?.steps.map((step, index) => (
              <JourneyStep
                key={step.id}
                step={step}
                isLast={index === data.steps.length - 1}
              />
            ))}
      </section>

      <section className="flex items-center gap-3 overflow-hidden rounded-ic-xl border border-ic-cream-dark bg-ic-cream-light p-4 shadow-ic-card">
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
          <Flower2 size={23} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-[22px] font-semibold leading-6 text-ic-black">
            Cada etapa aproxima você da sua melhor versão.
          </p>
          <p className="mt-1 text-[12px] leading-5 text-ic-gray-600">
            Acompanhe resultados e próximos passos com clareza.
          </p>
        </div>
        <MockImage label="Paciente IC" className="h-20 w-16 flex-none" />
      </section>
    </div>
  );
}
