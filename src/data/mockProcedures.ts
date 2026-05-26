import type { Procedure } from "@/types";

export const mockProcedures: Procedure[] = [
  {
    id: "proc-1",
    name: "Botox Full Face",
    category: "Injetáveis",
    description:
      "Suaviza rugas e linhas de expressão, proporcionando um rosto mais leve, descansado e natural.",
    duration: "30-40 min",
    durationMinutes: 35,
    priceFrom: 1800,
    imageUrl: "/mockups/proc-botox.jpg",
    badge: "Mais Procurado",
    featured: true,
    longDescription:
      "Protocolo de toxina botulínica para prevenção, leveza facial e naturalidade."
  },
  {
    id: "proc-2",
    name: "Bioestimulador de Colágeno",
    category: "Facial",
    description:
      "Estimula firmeza, melhora textura e sustenta resultados progressivos com sofisticação.",
    duration: "45-60 min",
    durationMinutes: 55,
    priceFrom: 2600,
    imageUrl: "/mockups/proc-bioestim.jpg",
    featured: true,
    longDescription:
      "Tratamento indicado para firmeza e reposicionamento sutil ao longo das semanas."
  },
  {
    id: "proc-3",
    name: "Skin Booster",
    category: "Facial",
    description:
      "Hidratação profunda para uma pele mais luminosa, viçosa e com toque refinado.",
    duration: "30 min",
    durationMinutes: 30,
    priceFrom: 1450,
    imageUrl: "/mockups/proc-skinboost.jpg",
    featured: true,
    longDescription:
      "Microinjeções de ácido hialurônico para qualidade de pele e glow natural."
  },
  {
    id: "proc-4",
    name: "Preenchimento Labial",
    category: "Injetáveis",
    description:
      "Volume, contorno e hidratação labial com equilíbrio e assinatura natural.",
    duration: "60 min",
    durationMinutes: 60,
    priceFrom: 1900,
    imageUrl: "/mockups/proc-labios.jpg",
    badge: "Queridinho das Pacientes",
    featured: false,
    longDescription:
      "Planejamento individual para realçar o formato dos lábios com proporção."
  },
  {
    id: "proc-5",
    name: "Harmonização Facial",
    category: "Injetáveis",
    description:
      "Plano global para contornos, sustentação e harmonia sem perder sua expressão.",
    duration: "90 min",
    durationMinutes: 90,
    priceFrom: 4800,
    imageUrl: "/mockups/protocol-harmony.jpg",
    featured: true,
    longDescription:
      "Combinação personalizada de técnicas para equilíbrio facial sofisticado."
  },
  {
    id: "proc-6",
    name: "Limpeza de Pele Profunda",
    category: "Facial",
    description:
      "Preparo essencial para textura uniforme, poros refinados e toque renovado.",
    duration: "60 min",
    durationMinutes: 60,
    priceFrom: 650,
    imageUrl: "/mockups/proc-limpeza.jpg",
    featured: false,
    longDescription:
      "Higienização, extração cuidadosa e finalização calmante para a pele."
  },
  {
    id: "proc-7",
    name: "Rinomodelação",
    category: "Injetáveis",
    description:
      "Ajustes sutis de contorno nasal com abordagem conservadora e elegante.",
    duration: "40 min",
    durationMinutes: 40,
    priceFrom: 2400,
    imageUrl: "/mockups/proc-rino.jpg",
    featured: false,
    longDescription:
      "Correção temporária de pontos estratégicos para simetria e perfil."
  },
  {
    id: "proc-8",
    name: "Bioestimulador Capilar",
    category: "Capilar",
    description:
      "Estímulo do couro cabeludo para fortalecer fios e apoiar crescimento saudável.",
    duration: "45 min",
    durationMinutes: 45,
    priceFrom: 1550,
    imageUrl: "/mockups/proc-capilar.jpg",
    featured: false,
    longDescription:
      "Protocolo capilar personalizado para densidade, força e vitalidade dos fios."
  },
  {
    id: "proc-9",
    name: "Protocolo Corporal Firmador",
    category: "Corporal",
    description:
      "Associação de tecnologias e bioestímulo para firmeza corporal progressiva.",
    duration: "75 min",
    durationMinutes: 75,
    priceFrom: 3200,
    imageUrl: "/mockups/proc-corporal.jpg",
    featured: false,
    longDescription:
      "Tratamento corporal para textura, firmeza e contorno com acompanhamento."
  }
];
