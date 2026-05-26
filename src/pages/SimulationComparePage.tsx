import { CalendarDays, MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";
import { GoldButton } from "@/components/shared/GoldButton";
import { SimulationDisclaimer } from "@/components/simulation/SimulationDisclaimer";
import { openWhatsApp } from "@/lib/whatsapp";
import { simulationService } from "@/services/simulationService";
import type { SimulationProcedure, SimulationResult } from "@/types";

const markerMap: Record<
  SimulationProcedure,
  { label: string; top: string; left: string }
> = {
  botox: { label: "Botox", top: "24%", left: "50%" },
  nariz: { label: "Nariz", top: "46%", left: "50%" },
  labios: { label: "Lábios", top: "62%", left: "50%" },
  limpeza: { label: "Pele", top: "38%", left: "32%" }
};

export function SimulationComparePage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<SimulationResult | null>(null);

  useEffect(() => {
    const latest = simulationService.getLatest();
    if (!latest) {
      navigate("/simulacao-ia", { replace: true });
      return;
    }

    setResult(latest);
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
        <h1 className="mt-3 font-serif text-[31px] font-medium leading-9 text-ic-black">
          Antes e depois
        </h1>
        <p className="mx-auto mt-1 max-w-[330px] text-[13px] leading-5 text-ic-gray-600">
          Compare a selfie original com a prévia visual gerada para avaliação.
        </p>
      </section>

      <div className="relative">
        <BeforeAfterSlider
          beforeImageUrl={result.originalImageUrl}
          afterImageUrl={result.simulatedImageUrl}
          className="h-[430px]"
        />
        {result.selectedProcedureIds.map((procedure) => {
          const marker = markerMap[procedure];
          return (
            <span
              key={procedure}
              className="absolute z-20 rounded-ic-pill border border-ic-cream-light bg-ic-black/72 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ic-cream-light shadow-ic-card backdrop-blur"
              style={{ top: marker.top, left: marker.left, transform: "translate(-50%, -50%)" }}
            >
              {marker.label}
            </span>
          );
        })}
      </div>

      <SimulationDisclaimer compact />

      <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
        <p className="font-serif text-[23px] font-semibold leading-7 text-ic-black">
          Gostou da prévia?
        </p>
        <p className="mt-2 text-[13px] leading-5 text-ic-gray-600">
          Agende uma avaliação para entender o que é indicado para o seu caso.
        </p>
      </section>

      <GoldButton className="w-full" onClick={() => navigate("/agendar")}>
        <CalendarDays size={17} />
        Agendar avaliação
      </GoldButton>
      <GoldButton
        variant="outline"
        className="w-full"
        onClick={() =>
          openWhatsApp(
            "Olá, fiz uma simulação estética pelo app da IC Clinic e gostaria de agendar uma avaliação."
          )
        }
      >
        <MessageCircle size={17} />
        Enviar simulação para WhatsApp
      </GoldButton>
    </div>
  );
}
