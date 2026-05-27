import { CalendarDays, Download, MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";
import { GoldButton } from "@/components/shared/GoldButton";
import { SimulationDisclaimer } from "@/components/simulation/SimulationDisclaimer";
import { downloadBeforeAfterImage } from "@/lib/downloadImage";
import { openWhatsApp } from "@/lib/whatsapp";
import { simulationService } from "@/services/simulationService";
import type { SimulationProcedure, SimulationResult } from "@/types";

const markerMap: Record<
  SimulationProcedure,
  { label: string; top: string; width: string }
> = {
  botox: { label: "Botox", top: "27%", width: "72px" },
  nariz: { label: "Nariz", top: "48%", width: "62px" },
  labios: { label: "Lábios", top: "60%", width: "70px" },
  limpeza: { label: "Pele", top: "70%", width: "78px" }
};

export function SimulationComparePage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isSavingComparison, setIsSavingComparison] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

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

  const handleSaveComparison = async () => {
    setDownloadError(null);
    setIsSavingComparison(true);

    try {
      await downloadBeforeAfterImage({
        beforeImageUrl: result.originalImageUrl,
        afterImageUrl: result.simulatedImageUrl,
        selectedProcedures: result.selectedProcedures
      });
    } catch (error) {
      setDownloadError(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar a comparação."
      );
    } finally {
      setIsSavingComparison(false);
    }
  };

  return (
    <div className="space-y-5 pt-1">
      <section className="text-center">
        <h1 className="font-serif text-[36px] font-medium leading-10 text-ic-black">
          Compare seu
          <span className="block text-ic-gold-dark">antes e depois</span>
        </h1>
        <p className="mx-auto mt-1 max-w-[330px] text-[13px] leading-5 text-ic-gray-600">
          Veja sua simulação personalizada.
        </p>
      </section>

      <div className="relative">
        <BeforeAfterSlider
          beforeImageUrl={result.originalImageUrl}
          afterImageUrl={result.simulatedImageUrl}
          afterLabel="Simulação"
          className="h-[550px]"
        />
        {result.selectedProcedureIds.map((procedure) => {
          const marker = markerMap[procedure];
          return (
            <div
              key={procedure}
              className="absolute right-5 z-30 flex items-center"
              style={{ top: marker.top }}
            >
              <Sparkles size={11} className="mr-1 text-ic-gold-light" />
              <span
                className="border-t border-dashed border-ic-gold-light"
                style={{ width: marker.width }}
              />
              <span className="rounded-ic-sm border border-ic-gold/30 bg-ic-cream-light px-3 py-1 font-serif text-[15px] font-semibold text-ic-gold-dark shadow-ic-card">
                {marker.label}
              </span>
            </div>
          );
        })}
      </div>

      <section className="flex items-center gap-3 rounded-ic-lg border border-ic-cream-dark bg-ic-cream-light p-4 shadow-ic-card">
        <Sparkles size={23} className="flex-none text-ic-gold" />
        <p className="text-[13px] leading-5 text-ic-gray-600">
          Resultado natural, harmônico e personalizado para a sua melhor versão.
        </p>
      </section>

      <GoldButton
        type="button"
        variant="outline"
        className="w-full"
        disabled={isSavingComparison}
        onClick={() => void handleSaveComparison()}
      >
        <Download size={17} />
        {isSavingComparison ? "Preparando imagem..." : "Salvar antes e depois"}
      </GoldButton>

      {downloadError ? (
        <p className="rounded-ic-md bg-ic-warning/15 px-4 py-3 text-[12px] leading-5 text-ic-gold-dark">
          {downloadError}
        </p>
      ) : null}

      <GoldButton className="w-full" onClick={() => navigate("/agendar")}>
        <CalendarDays size={17} />
        Agendar consulta
      </GoldButton>

      <SimulationDisclaimer compact />

      <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
        <p className="font-serif text-[23px] font-semibold leading-7 text-ic-black">
          Gostou da prévia?
        </p>
        <p className="mt-2 text-[13px] leading-5 text-ic-gray-600">
          Agende uma avaliação para entender o que é indicado para o seu caso.
        </p>
      </section>
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
