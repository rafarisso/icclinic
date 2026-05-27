import type { Procedure } from "@/types";

const commonAttention =
  "Conteúdo educativo. A indicação depende de avaliação profissional da Dra. Camila Castro.";

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
      "Protocolo de toxina botulínica para prevenção, leveza facial e naturalidade.",
    idealFor: [
      "Linhas de expressão na testa, glabela e área dos olhos",
      "Paciente que deseja aparência descansada sem perder expressão",
      "Manutenção preventiva de rugas dinâmicas"
    ],
    benefits: [
      "Suaviza contrações musculares responsáveis por linhas dinâmicas",
      "Entrega aspecto mais leve e descansado",
      "Consulta rápida, com retorno à rotina no mesmo dia em muitos casos"
    ],
    preparation: [
      "Informar uso de anticoagulantes, alergias e histórico médico",
      "Chegar sem maquiagem pesada na região tratada",
      "Realizar avaliação facial para dose e pontos personalizados"
    ],
    aftercare: [
      "Não massagear a área tratada nas primeiras horas",
      "Evitar atividade física intensa no dia do procedimento",
      "Retornar para revisão se a Dra. Camila indicar"
    ],
    recommendedInterval: "Avaliação de manutenção em 3 a 4 meses.",
    maintenance: "Retoque pode ser avaliado após 15 dias, se necessário.",
    attention:
      "Procedimento médico injetável. Indicação, dose e segurança dependem da avaliação individual.",
    nextSuggestions: ["Skin Booster", "Bioestimulador de Colágeno"]
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
      "Tratamento indicado para firmeza e reposicionamento sutil ao longo das semanas.",
    idealFor: [
      "Flacidez leve a moderada",
      "Pele com perda gradual de firmeza",
      "Paciente que busca resultado progressivo e discreto"
    ],
    benefits: [
      "Estimula produção de colágeno ao longo do tempo",
      "Melhora firmeza, textura e qualidade da pele",
      "Ajuda a construir uma jornada de rejuvenescimento natural"
    ],
    preparation: [
      "Avaliar histórico de alergias, doenças ativas e medicações",
      "Fotografar antes para acompanhar evolução",
      "Planejar áreas e número de sessões com a Dra. Camila"
    ],
    aftercare: [
      "Seguir massagem ou orientação específica se prescrita",
      "Evitar exposição solar intensa nos primeiros dias",
      "Manter hidratação e retorno de acompanhamento"
    ],
    recommendedInterval: "Sessões costumam ser planejadas com pausa de 30 a 60 dias.",
    maintenance: "Reavaliação em 6 a 12 meses conforme resposta da pele.",
    attention:
      "Resultado é gradual e depende da resposta biológica individual ao estímulo de colágeno.",
    nextSuggestions: ["Botox Full Face", "Skin Booster"]
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
      "Microinjeções de ácido hialurônico para qualidade de pele e glow natural.",
    idealFor: [
      "Pele opaca, desidratada ou com perda de viço",
      "Linhas finas associadas a ressecamento",
      "Paciente que deseja glow sem mudança de volume"
    ],
    benefits: [
      "Promove hidratação profunda da pele",
      "Melhora textura, luminosidade e elasticidade",
      "Combina bem com protocolos de rejuvenescimento sutil"
    ],
    preparation: [
      "Chegar com pele limpa e sem irritações ativas",
      "Informar procedimentos recentes e uso de ácidos",
      "Registrar foto inicial para comparar evolução"
    ],
    aftercare: [
      "Evitar calor intenso, sauna e sol direto por curto período",
      "Usar protetor solar e hidratação orientada",
      "Não manipular pequenos pontos de aplicação"
    ],
    recommendedInterval: "Pode ser organizado em 2 a 3 sessões com pausa mensal.",
    maintenance: "Manutenção sugerida a cada 4 a 6 meses, conforme avaliação.",
    attention: commonAttention,
    nextSuggestions: ["Limpeza de Pele Profunda", "Botox Full Face"]
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
      "Planejamento individual para realçar o formato dos lábios com proporção.",
    idealFor: [
      "Lábios com perda de contorno ou hidratação",
      "Assimetria leve que pode ser suavizada",
      "Paciente que busca volume discreto e natural"
    ],
    benefits: [
      "Define contorno e melhora hidratação labial",
      "Pode realçar proporção sem exagero",
      "Planejamento respeita formato original do rosto"
    ],
    preparation: [
      "Informar histórico de herpes labial e alergias",
      "Evitar procedimento se houver infecção ou ferida ativa",
      "Alinhar expectativa de volume com referências naturais"
    ],
    aftercare: [
      "Evitar pressão, calor intenso e manipulação dos lábios",
      "Observar edema esperado nos primeiros dias",
      "Retornar para ajuste apenas se indicado"
    ],
    recommendedInterval: "Reavaliação em 30 dias para acompanhar acomodação.",
    maintenance: "Manutenção costuma variar de 8 a 12 meses.",
    attention:
      "Preenchimento é procedimento médico com riscos e deve ser feito por profissional habilitado.",
    nextSuggestions: ["Botox Full Face", "Skin Booster"]
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
      "Combinação personalizada de técnicas para equilíbrio facial sofisticado.",
    idealFor: [
      "Paciente que deseja plano global e progressivo",
      "Queixa combinada de contorno, proporção e qualidade de pele",
      "Busca por resultado elegante, sem mudança brusca"
    ],
    benefits: [
      "Organiza prioridades em uma jornada de tratamento",
      "Combina técnicas com pausas seguras entre etapas",
      "Facilita acompanhamento por fotos e revisões"
    ],
    preparation: [
      "Fazer consulta detalhada e anamnese",
      "Registrar fotos autorizadas para planejamento",
      "Definir etapas, intervalos e orçamento com clareza"
    ],
    aftercare: [
      "Seguir orientações específicas de cada etapa",
      "Evitar sobreposição de procedimentos sem liberação",
      "Comparecer aos retornos programados"
    ],
    recommendedInterval: "Etapas podem ter pausas de 30 a 90 dias, conforme técnica.",
    maintenance: "Plano revisado a cada consulta e ajustado à resposta da paciente.",
    attention:
      "Não é um pacote fixo. A indicação depende de avaliação facial completa.",
    nextSuggestions: ["Bioestimulador de Colágeno", "Skin Booster"]
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
      "Higienização, extração cuidadosa e finalização calmante para a pele.",
    idealFor: [
      "Pele com poros obstruídos ou textura irregular",
      "Preparo para protocolos de glow e hidratação",
      "Rotina de cuidado recorrente e preventiva"
    ],
    benefits: [
      "Remove impurezas e melhora sensação de frescor",
      "Ajuda a uniformizar textura superficial",
      "Prepara a pele para melhor adesão aos cuidados em casa"
    ],
    preparation: [
      "Evitar esfoliação agressiva antes da sessão",
      "Informar uso recente de ácidos ou medicamentos",
      "Chegar sem maquiagem pesada"
    ],
    aftercare: [
      "Usar protetor solar e produtos suaves",
      "Evitar sol direto e calor intenso nas primeiras 24 horas",
      "Não cutucar pontos sensíveis após extração"
    ],
    recommendedInterval: "Pode ser repetida a cada 30 a 60 dias.",
    maintenance: "Rotina domiciliar orientada aumenta a durabilidade do viço.",
    attention:
      "Pele inflamada, infeccionada ou muito sensibilizada precisa ser avaliada antes.",
    nextSuggestions: ["Skin Booster", "Harmonização Facial"]
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
      "Correção temporária de pontos estratégicos para simetria e perfil.",
    idealFor: [
      "Ajustes sutis de dorso, ponta ou perfil nasal",
      "Paciente que busca melhora conservadora sem cirurgia",
      "Casos em que a avaliação indica segurança anatômica"
    ],
    benefits: [
      "Pode melhorar contorno de forma temporária",
      "Planejamento considera proporção do rosto inteiro",
      "Resultado deve preservar identidade facial"
    ],
    preparation: [
      "Avaliação presencial obrigatória da anatomia nasal",
      "Informar procedimentos anteriores no nariz",
      "Entender riscos, limites e alternativas"
    ],
    aftercare: [
      "Evitar pressão local, óculos apertados e manipulação",
      "Observar sinais incomuns e comunicar a clínica",
      "Comparecer ao retorno definido pela Dra. Camila"
    ],
    recommendedInterval: "Retorno inicial costuma ocorrer em 15 a 30 dias.",
    maintenance: "Durabilidade é individual e depende do produto e da região.",
    attention:
      "Região de alta complexidade. Deve ser indicada com muito critério e segurança.",
    nextSuggestions: ["Botox Full Face", "Preenchimento Labial"]
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
      "Protocolo capilar personalizado para densidade, força e vitalidade dos fios.",
    idealFor: [
      "Queixa de queda, afinamento ou perda de densidade",
      "Couro cabeludo que precisa de estímulo e acompanhamento",
      "Paciente que deseja plano capilar com metas mensais"
    ],
    benefits: [
      "Apoia vitalidade do couro cabeludo",
      "Permite acompanhar resposta por fotos e medidas",
      "Pode complementar rotina indicada pela profissional"
    ],
    preparation: [
      "Levar exames e histórico de tratamentos capilares",
      "Informar queda recente, estresse, medicações e pós-parto",
      "Evitar produtos pesados no couro cabeludo no dia"
    ],
    aftercare: [
      "Evitar lavar ou aplicar produtos conforme orientação recebida",
      "Manter rotina prescrita e fotos de evolução",
      "Retornar para ajustes do protocolo"
    ],
    recommendedInterval: "Sessões podem ser mensais, conforme diagnóstico.",
    maintenance: "Reavaliação de progresso a cada 90 dias.",
    attention:
      "Queda capilar pode ter causas clínicas e precisa de investigação individual.",
    nextSuggestions: ["Bioestimulador de Colágeno", "Limpeza de Pele Profunda"]
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
      "Tratamento corporal para textura, firmeza e contorno com acompanhamento.",
    idealFor: [
      "Flacidez corporal leve a moderada",
      "Textura irregular e perda de firmeza",
      "Paciente que deseja plano progressivo com acompanhamento"
    ],
    benefits: [
      "Organiza cuidado corporal em etapas",
      "Pode melhorar firmeza e textura ao longo das sessões",
      "Acompanhamento com medidas, fotos e retornos"
    ],
    preparation: [
      "Avaliar áreas prioritárias e histórico de saúde",
      "Registrar fotos autorizadas para comparação",
      "Alinhar número de sessões e rotina de manutenção"
    ],
    aftercare: [
      "Hidratar a pele e seguir orientações específicas",
      "Evitar sol direto se houver sensibilidade",
      "Manter retornos para medir evolução"
    ],
    recommendedInterval: "Protocolos corporais podem ter pausas de 15 a 45 dias.",
    maintenance: "Revisão a cada ciclo para ajustar tecnologia e metas.",
    attention: commonAttention,
    nextSuggestions: ["Harmonização Facial", "Skin Booster"]
  }
];
