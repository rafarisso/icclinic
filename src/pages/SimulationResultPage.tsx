import { CalendarDays, Edit3, MessageCircle, Scale, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoldButton } from "@/components/shared/GoldButton";
import { SimulationDisclaimer } from "@/components/simulation/SimulationDisclaimer";
import { cn } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";
import { simulationService } from "@/services/simulationService";
import type { SimulationIntensity, SimulationResult } from "@/types";

const intensities: Array<{ id: SimulationIntensity; label: string }> = [
  { id: "natural", label: "Natural" },
  { id: "moderado", label: "Moderado" },
  { id: "marcante", label: "Marcante" }
];

export function SimulationResultPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [selectedIntensity, setSelectedIntensity] =
    useState<SimulationIntensity>("natural");

  useEffect(() => {
    const latest = simulationService.getLatest();
    if (!latest) {
      navigate("/simulacao-ia", { replace: true });
      return;
    }

    setResult(latest);
    setSelectedIntensity(latest.intensity);
  }, [navigate]);

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-5 pt-1">
      <section className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
          <Sparkles size={22} />
        </span>
        <h1 className="mt-3 font-serif text-[32px] font-medium leading-9 text-ic-black">
          Resultado simulado
        </h1>
        <p className="mx-auto mt-1 max-w-[320px] text-[13px] leading-5 text-ic-gray-600">
          Uma prévia visual suave para apoiar sua avaliação com a IC Clinic.
        </p>
      </section>

      <section className="relative overflow-hidden rounded-ic-xl bg-ic-cream-light shadow-ic-elevated">
        <img
          src={result.simulatedImageUrl}
          alt="Simulação estética ilustrativa"
          className="h-[430px] w-full object-cover"
        />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="rounded-ic-lg bg-ic-black/72 px-3 py-2 text-ic-cream-light backdrop-blur">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ic-gold-light">
              Prévia visual
            </p>
            <p className="font-serif text-[21px] font-semibold">Natural e sutil</p>
          </div>
          <img
            src={result.originalImageUrl}
            alt="Foto original"
            className="h-20 w-16 rounded-ic-md border-2 border-ic-cream-light object-cover shadow-ic-card"
          />
        </div>
      </section>

      <section className="rounded-ic-lg bg-ic-cream-light p-4 shadow-ic-card">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ic-gold">
          Procedimentos escolhidos
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {result.selectedProcedures.map((procedure) => (
            <span
              key={procedure}
              className="rounded-ic-pill bg-ic-gold/12 px-3 py-1.5 text-xs font-semibold text-ic-gold-dark"
            >
              {procedure}
            </span>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-3 text-sm font-semibold text-ic-black">
          Intensidade da simulação
        </p>
        <div className="grid grid-cols-3 gap-2">
          {intensities.map((intensity) => (
            <button
              type="button"
              key={intensity.id}
              onClick={() => setSelectedIntensity(intensity.id)}
              className={cn(
                "h-10 rounded-ic-pill border text-xs font-semibold shadow-ic-card",
                selectedIntensity === intensity.id
                  ? "border-ic-black bg-ic-black text-ic-cream-light"
                  : "border-ic-cream-dark bg-ic-cream-light text-ic-gray-600"
              )}
            >
              {intensity.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] leading-4 text-ic-gray-600">
          Para o MVP, a geração usa Natural como padrão. As demais opções ficam
          preparadas para refinamento posterior.
        </p>
      </section>

      <SimulationDisclaimer compact />

      <div className="grid grid-cols-2 gap-2.5">
        <GoldButton variant="outline" onClick={() => navigate("/simulacao-ia")}>
          <Edit3 size={16} />
          Ajustar
        </GoldButton>
        <GoldButton variant="outline" onClick={() => navigate("/simulacao-ia/comparacao")}>
          <Scale size={16} />
          Ver comparação
        </GoldButton>
      </div>

      <GoldButton className="w-full" onClick={() => navigate("/agendar")}>
        <CalendarDays size={17} />
        Agendar avaliação
      </GoldButton>
      <GoldButton
        variant="ghost"
        className="w-full"
        onClick={() =>
          openWhatsApp(
            "Olá, fiz uma simulação estética pelo app da IC Clinic e gostaria de agendar uma avaliação."
          )
        }
      >
        <MessageCircle size={17} />
        Falar com a IC Clinic
      </GoldButton>
    </div>
  );
}
