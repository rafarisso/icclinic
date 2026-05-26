import { Camera, Check, ImagePlus, Sparkles } from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
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

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setError(null);
    setFile(nextFile);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(nextFile ? URL.createObjectURL(nextFile) : null);
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
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
          <Sparkles size={22} />
        </span>
        <h1 className="mt-3 font-serif text-[34px] font-medium leading-10 text-ic-black">
          Simulação com IA
        </h1>
        <p className="mx-auto mt-1 max-w-[310px] text-[13px] leading-5 text-ic-gray-600">
          Envie uma selfie para visualizar possibilidades estéticas.
        </p>
      </section>

      <section className="rounded-ic-xl border border-ic-gold/22 bg-ic-cream-light p-4 shadow-ic-card">
        <label className="block cursor-pointer">
          <input
            className="sr-only"
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleFile}
          />
          <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-ic-lg border border-dashed border-ic-gold/45 bg-ic-cream">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Selfie selecionada"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="px-8 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ic-gold text-ic-white shadow-ic-card">
                  <Camera size={25} />
                </span>
                <p className="mt-4 font-serif text-[24px] font-semibold text-ic-black">
                  Tirar foto ou enviar imagem
                </p>
                <p className="mt-2 text-[12px] leading-5 text-ic-gray-600">
                  Prefira uma selfie frontal, com boa iluminação e rosto visível.
                </p>
              </div>
            )}
          </div>
        </label>
        <p className="mt-3 flex items-center justify-center gap-2 text-[12px] text-ic-gray-600">
          <ImagePlus size={14} className="text-ic-gold" />
          A imagem será usada apenas para gerar uma prévia ilustrativa.
        </p>
      </section>

      <section>
        <p className="mb-3 text-sm font-semibold text-ic-black">
          Escolha os procedimentos
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {procedures.map((procedure) => {
            const active = selected.includes(procedure.id);
            return (
              <button
                key={procedure.id}
                type="button"
                onClick={() => toggleProcedure(procedure.id)}
                className={cn(
                  "flex min-h-[76px] items-center gap-3 rounded-ic-lg border p-3 text-left shadow-ic-card transition-colors",
                  active
                    ? "border-ic-gold bg-ic-gold/12"
                    : "border-ic-cream-dark bg-ic-cream-light"
                )}
                aria-pressed={active}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 flex-none items-center justify-center rounded-full border",
                    active
                      ? "border-ic-gold bg-ic-gold text-ic-white"
                      : "border-ic-gray-400 text-transparent"
                  )}
                >
                  <Check size={15} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ic-black">
                    {procedure.label}
                  </span>
                  <span className="mt-1 block text-[11px] leading-4 text-ic-gray-600">
                    {procedure.hint}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
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
        {isLoading ? "Gerando prévia..." : "Gerar simulação"}
      </GoldButton>
    </form>
  );
}
