import { ShieldCheck } from "lucide-react";

interface SimulationDisclaimerProps {
  compact?: boolean;
}

export function SimulationDisclaimer({ compact = false }: SimulationDisclaimerProps) {
  return (
    <div className="flex gap-3 rounded-ic-lg border border-ic-gold/25 bg-ic-cream-light p-4 shadow-ic-card">
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
        <ShieldCheck size={18} />
      </span>
      <div>
        <p className="font-serif text-[20px] font-semibold leading-6 text-ic-black">
          Simulação ilustrativa
        </p>
        <p className="mt-1 text-[12px] leading-5 text-ic-gray-600">
          {compact
            ? "O resultado real depende de avaliação profissional da Dra. Camila Castro."
            : "As imagens enviadas são tratadas como dados sensíveis. A simulação não substitui avaliação profissional."}
        </p>
      </div>
    </div>
  );
}
