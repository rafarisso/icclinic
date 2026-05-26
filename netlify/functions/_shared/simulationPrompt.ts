export type SimulationProcedure = "botox" | "nariz" | "labios" | "limpeza";

export type SimulationIntensity = "natural" | "moderado" | "marcante";

const procedureInstructions: Record<SimulationProcedure, string> = {
  botox:
    "Suavizar discretamente linhas de expressao, mantendo naturalidade e expressao facial.",
  nariz:
    "Melhorar sutilmente contorno e ponta nasal, com efeito harmonico e conservador.",
  labios:
    "Dar leve definicao, hidratacao e contorno aos labios, sem exagerar volume.",
  limpeza:
    "Uniformizar textura, luminosidade e vico da pele, sem aparencia de filtro pesado."
};

const intensityInstructions: Record<SimulationIntensity, string> = {
  natural: "Alteracao minima, elegante e muito sutil.",
  moderado: "Alteracao visivel, mas ainda realista e proporcional.",
  marcante: "Alteracao mais perceptivel, porem sem exagero ou artificialidade."
};

const procedureLabels: Record<SimulationProcedure, string> = {
  botox: "Botox",
  nariz: "Nariz",
  labios: "Labios",
  limpeza: "Limpeza de pele"
};

export function normalizeProcedures(values: string[]): SimulationProcedure[] {
  const allowed: SimulationProcedure[] = ["botox", "nariz", "labios", "limpeza"];
  return values.filter((value): value is SimulationProcedure =>
    allowed.includes(value as SimulationProcedure)
  );
}

export function normalizeIntensity(value: string | null): SimulationIntensity {
  if (value === "moderado" || value === "marcante") {
    return value;
  }

  return "natural";
}

export function getProcedureLabels(procedures: SimulationProcedure[]) {
  return procedures.map((procedure) => procedureLabels[procedure]);
}

export function buildSimulationPrompt(
  procedures: SimulationProcedure[],
  intensity: SimulationIntensity
) {
  const selected = getProcedureLabels(procedures).join(", ");
  const details = procedures
    .map((procedure) => `- ${procedureInstructions[procedure]}`)
    .join("\n");

  return [
    "Edite a selfie enviada mantendo a identidade facial da pessoa, idade aparente, expressao, cabelo, roupa e enquadramento.",
    "Gere uma simulacao estetica ilustrativa, natural e sutil, como previa para consulta em clinica de estetica premium.",
    `Aplicar apenas os procedimentos selecionados: ${selected}.`,
    `Intensidade: ${intensityInstructions[intensity]}`,
    details,
    "O resultado deve ser harmonioso, discreto, realista e elegante.",
    "Nao exagerar volumes. Nao criar aparencia artificial. Nao mudar drasticamente o rosto.",
    "Nao alterar idade, etnia, formato geral do rosto, cabelo, expressao, roupa ou fundo de forma drastica.",
    "Nao transformar a pessoa em outra pessoa. Nao sexualizar a imagem.",
    "Nao remover caracteristicas pessoais importantes.",
    "Resultado ilustrativo, nao medico."
  ].join("\n");
}
