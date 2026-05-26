import {
  ArrowRight,
  Camera,
  Check,
  Image as ImageIcon,
  ImagePlus,
  Sparkles
} from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoldButton } from "@/components/shared/GoldButton";
import { SimulationDisclaimer } from "@/components/simulation/SimulationDisclaimer";
import { cn } from "@/lib/utils";
import { simulationService } from "@/services/simulationService";
import type { SimulationProcedure } from "@/types";

const procedures: Array<{ id: SimulationProcedure; label: string; hint: string }> = [
  { id: "botox", label: "Botox", hint: "Linhas suaves" },
  { id: "nariz", label: "Nariz", hint: "Empinadinha sutil" },
  { id: "labios", label: "Lábios", hint: "Definição natural" },
  { id: "limpeza", label: "Limpeza de pele", hint: "Viço e textura" }
];

export function SimulationUploadPage() {
  const navigate = useNavigate();
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selected, setSelected] = useState<SimulationProcedure[]>(["limpeza"]);
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => Boolean(file && selected.length > 0 && consent && !isLoading),
    [consent, file, isLoading, selected.length]
  );

  const toggleProcedure = (procedure: SimulationProcedure) => {
    setSelected((current) =>
      current.includes(procedure)
        ? current.filter((item) => item !== procedure)
        : [...current, procedure]
    );
  };

  const selectFile = (nextFile: File | null) => {
    setError(null);
    setFile(nextFile);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(nextFile ? URL.createObjectURL(nextFile) : null);
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    selectFile(event.target.files?.[0] ?? null);
  };

  const loadSampleImage = async () => {
    setError(null);
    const response = await fetch("/mockups/simulation-original.jpg");
    const blob = await response.blob();
    const sampleFile = new File([blob], "selfie-exemplo-ic-clinic.jpg", {
      type: blob.type || "image/jpeg"
    });
    selectFile(sampleFile);
    setSelected(["botox", "nariz", "labios", "limpeza"]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError("Envie uma selfie para gerar a simulação.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await simulationService.generate({
        file,
        procedures: selected,
        intensity: "natural",
        consent
      });
      simulationService.save(result);
      navigate("/simulacao-ia/resultado");
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível gerar a simulação.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-5 pt-1" onSubmit={handleSubmit}>
      <section className="text-center">
        <h1 className="font-serif text-[36px] font-medium leading-10 text-ic-black">
          Simulação com IA
        </h1>
        <p className="mx-auto mt-1 max-w-[310px] text-[13px] leading-5 text-ic-gray-600">
          Envie uma selfie para visualizar possibilidades estéticas.
        </p>
      </section>

      <section>
        <label className="block cursor-pointer">
          <input
            ref={cameraInputRef}
            className="sr-only"
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleFile}
          />
          <input
            ref={galleryInputRef}
            className="sr-only"
            type="file"
            accept="image/*"
            onChange={handleFile}
          />
          <div className="relative h-[430px] overflow-hidden rounded-ic-lg border border-ic-gold/18 bg-ic-cream-light shadow-ic-card">
            <img
              src={previewUrl ?? "/mockups/simulation-original.jpg"}
              alt={previewUrl ? "Selfie selecionada" : "Exemplo de selfie"}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-7">
              <span className="absolute left-0 top-0 h-16 w-16 rounded-tl-[28px] border-l border-t border-ic-gold-light" />
              <span className="absolute right-0 top-0 h-16 w-16 rounded-tr-[28px] border-r border-t border-ic-gold-light" />
              <span className="absolute bottom-0 left-0 h-16 w-16 rounded-bl-[28px] border-b border-l border-ic-gold-light" />
              <span className="absolute bottom-0 right-0 h-16 w-16 rounded-br-[28px] border-b border-r border-ic-gold-light" />
            </div>
            {!previewUrl ? (
              <div className="absolute inset-x-4 bottom-4 rounded-ic-md bg-ic-cream-light/88 px-4 py-3 text-center text-[12px] leading-5 text-ic-gray-600 backdrop-blur">
                Use uma selfie frontal ou teste com a imagem exemplo.
              </div>
            ) : null}
          </div>
        </label>
        <p className="mt-3 flex items-center justify-center gap-2 text-[12px] text-ic-gray-600">
          <ImagePlus size={14} className="text-ic-gold" />
          A imagem será usada apenas para gerar uma prévia ilustrativa.
        </p>
      </section>

      <section className="space-y-4">
        <div className="hide-scrollbar -mx-screen-px flex gap-2 overflow-x-auto px-screen-px">
          {procedures.map((procedure) => {
            const active = selected.includes(procedure.id);
            return (
              <button
                key={procedure.id}
                type="button"
                onClick={() => toggleProcedure(procedure.id)}
                className={cn(
                  "flex h-12 flex-none items-center gap-2 rounded-ic-md border px-4 text-sm shadow-ic-card transition-colors",
                  active
                    ? "border-ic-gold bg-ic-gold/12"
                    : "border-ic-cream-dark bg-ic-cream-light"
                )}
                aria-pressed={active}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 flex-none items-center justify-center rounded-full border",
                    active
                      ? "border-ic-gold bg-ic-gold text-ic-white"
                      : "border-ic-gray-400 text-transparent"
                  )}
                >
                  <Check size={12} />
                </span>
                <span className="whitespace-nowrap font-semibold text-ic-black">
                  {procedure.label}
                </span>
              </button>
            );
          })}
        </div>
        <p className="flex items-center justify-center gap-2 text-[12px] text-ic-gray-600">
          <Sparkles size={14} className="text-ic-gold" />
          Simulação ilustrativa
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="flex h-16 items-center justify-center gap-2 rounded-ic-md border border-ic-cream-dark bg-ic-cream-light text-sm font-semibold text-ic-black shadow-ic-card"
          >
            <Camera size={18} className="text-ic-gold" />
            Tirar foto
          </button>
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="flex h-16 items-center justify-center gap-2 rounded-ic-md border border-ic-cream-dark bg-ic-cream-light text-sm font-semibold text-ic-black shadow-ic-card"
          >
            <ImageIcon size={18} className="text-ic-gold" />
            Usar da galeria
          </button>
        </div>
        <button
          type="button"
          onClick={() => void loadSampleImage()}
          className="mx-auto block text-xs font-semibold text-ic-gold-dark"
        >
          Usar imagem exemplo da apresentação
        </button>
      </section>

      <label className="flex items-start gap-3 rounded-ic-lg border border-ic-cream-dark bg-ic-cream-light p-4 shadow-ic-card">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-4 w-4 accent-ic-gold"
        />
        <span className="text-[12px] leading-5 text-ic-gray-600">
          Autorizo o uso desta imagem exclusivamente para gerar uma simulação
          estética ilustrativa.
        </span>
      </label>

      <SimulationDisclaimer />

      {error ? (
        <p className="rounded-ic-md bg-ic-warning/15 px-4 py-3 text-[12px] leading-5 text-ic-gold-dark">
          {error}
        </p>
      ) : null}

      <GoldButton className="w-full" disabled={!canSubmit}>
        {isLoading ? "Gerando prévia..." : "Continuar"}
        {!isLoading ? <ArrowRight size={17} /> : null}
      </GoldButton>
    </form>
  );
}
