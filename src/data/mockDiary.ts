import type { Diary } from "@/types";

export const mockDiary: Diary = {
  beforePhotoUrl: "/mockups/diary-before.jpg",
  afterPhotoUrl: "/mockups/diary-after.jpg",
  entries: [
    {
      id: "entry-1",
      date: "2026-04-12",
      title: "Pele mais viçosa",
      description:
        "Melhora na luminosidade e textura da pele já perceptível.",
      thumbnailUrl: "/mockups/diary-1.jpg"
    },
    {
      id: "entry-2",
      date: "2026-04-28",
      title: "Recuperação excelente",
      description:
        "Sem intercorrências. Edema reduzido e evolução dentro do esperado.",
      thumbnailUrl: "/mockups/diary-2.jpg"
    },
    {
      id: "entry-3",
      date: "2026-05-10",
      title: "Resultado natural e harmônico",
      description:
        "Contornos mais definidos e expressão leve. Muito satisfeita!",
      thumbnailUrl: "/mockups/diary-3.jpg"
    }
  ]
};
