import { CalendarDays, Edit3, MessageCircle, Scale } from "lucide-react";
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
        <h1 className="font-serif text-[34px] font-medium leading-10 text-ic-black">
          Prévia da sua simulação
        </h1>
        <p className="mx-auto mt-1 max-w-[320px] text-[13px] leading-5 text-ic-gray-600">
          Veja como os procedimentos podem realçar sua melhor versão.
        </p>
      </section>

      <section className="hide-scrollbar -mx-screen-px flex gap-2 overflow-x-auto px-screen-px">
        {result.selectedProcedures.map((procedure) => (
          <span
            key={procedure}
            className="flex h-9 flex-none items-center gap-2 rounded-ic-pill border border-ic-gold/40 bg-ic-cream-light px-4 text-xs font-semibold text-ic-gold-dark shadow-ic-card"
          >
            {procedure}
            <span className="text-ic-gold">✓</span>
          </span>
        ))}
      </section>

      <section className="grid grid-cols-[96px_1fr] gap-3">
        <div className="overflow-hidden rounded-ic-lg border border-ic-cream-dark bg-ic-cream-light shadow-ic-card">
          <div className="px-2 py-2 text-center text-[11px] font-semibold text-ic-gray-600">
            Foto original
          </div>
          <img
            src={result.originalImageUrl}
            alt="Foto original"
            className="h-[246px] w-full object-cover"
          />
        </div>
        <div className="relative overflow-hidden rounded-ic-lg border border-ic-gold/22 bg-ic-cream-light shadow-ic-elevated">
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-ic-md bg-ic-gold px-5 py-2 font-serif text-[16px] font-semibold text-ic-white shadow-ic-card">
            Resultado simulado
          </div>
          <img
            src={result.simulatedImageUrl}
            alt="Simulação estética ilustrativa"
            className="h-[500px] w-full object-cover"
          />
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ic-black">
          <span className="text-ic-gold">✦</span>
          Intensidade
        </div>
        <div className="grid grid-cols-3 rounded-ic-pill border border-ic-cream-dark bg-ic-cream-light p-1 shadow-ic-card">
          {intensities.map((intensity) => (
            <button
              type="button"
              key={intensity.id}
              onClick={() => setSelectedIntensity(intensity.id)}
              className={cn(
                "h-10 rounded-ic-pill text-xs font-semibold transition-colors",
                selectedIntensity === intensity.id
                  ? "bg-ic-cream text-ic-black shadow-ic-card"
                  : "text-ic-gray-600"
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
        <GoldButton onClick={() => navigate("/simulacao-ia/comparacao")}>
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
