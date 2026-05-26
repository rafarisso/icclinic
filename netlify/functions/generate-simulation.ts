import type { Config, Context } from "@netlify/functions";
import OpenAI, { toFile } from "openai";
import {
  buildSimulationPrompt,
  getProcedureLabels,
  normalizeIntensity,
  normalizeProcedures
} from "./_shared/simulationPrompt";

declare const Netlify: {
  env: {
    get: (name: string) => string | undefined;
  };
};

const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;

interface SimulationResponse {
  simulatedImageUrl: string;
  selectedProcedures: string[];
  intensity: string;
  disclaimer: string;
  mode: "openai" | "mock";
}

interface ErrorResponse {
  error: string;
}

const disclaimer =
  "Simulação ilustrativa. O resultado real depende de avaliação profissional da Dra. Camila Castro.";

function jsonResponse(body: SimulationResponse | ErrorResponse, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

function createMockSimulationDataUrl(selectedProcedures: string[]) {
  const details = selectedProcedures.length
    ? selectedProcedures.join(" + ")
    : "Prévia natural";

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1280" viewBox="0 0 1024 1280">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FAF5EC"/>
      <stop offset="0.48" stop-color="#E8DCC8"/>
      <stop offset="1" stop-color="#B89968"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="34%" r="42%">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.86"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1024" height="1280" fill="url(#bg)"/>
  <rect width="1024" height="1280" fill="url(#glow)"/>
  <ellipse cx="512" cy="498" rx="230" ry="300" fill="#D9BFA0" opacity="0.92"/>
  <path d="M330 468 C360 340 438 276 512 276 C596 276 666 346 694 468 C662 404 604 374 512 374 C420 374 362 404 330 468Z" fill="#2D2620" opacity="0.86"/>
  <ellipse cx="430" cy="514" rx="22" ry="15" fill="#2D2620" opacity="0.65"/>
  <ellipse cx="594" cy="514" rx="22" ry="15" fill="#2D2620" opacity="0.65"/>
  <path d="M512 526 C496 585 488 620 512 636 C536 620 528 585 512 526Z" fill="none" stroke="#8B6F47" stroke-width="10" stroke-linecap="round" opacity="0.58"/>
  <path d="M438 700 C484 732 544 732 586 700" fill="none" stroke="#A66F6A" stroke-width="22" stroke-linecap="round" opacity="0.72"/>
  <circle cx="392" cy="608" r="34" fill="#E8B7A6" opacity="0.35"/>
  <circle cx="632" cy="608" r="34" fill="#E8B7A6" opacity="0.35"/>
  <text x="512" y="940" text-anchor="middle" font-family="Georgia, serif" font-size="64" fill="#2D2620">Simulação com IA</text>
  <text x="512" y="1008" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#6B6258">${details}</text>
  <text x="512" y="1068" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#8B6F47">Prévia ilustrativa, natural e sutil</text>
</svg>`.trim();

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export default async (req: Request, _context: Context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Método não permitido." }, 405);
  }

  const formData = await req.formData();
  const image = formData.get("image");
  const consent = formData.get("consent");
  const procedures = normalizeProcedures(formData.getAll("procedures").map(String));
  const intensity = normalizeIntensity(String(formData.get("intensity") ?? "natural"));

  if (consent !== "true") {
    return jsonResponse(
      {
        error:
          "É necessário autorizar o uso da imagem para gerar a simulação ilustrativa."
      },
      400
    );
  }

  if (!(image instanceof File)) {
    return jsonResponse({ error: "Envie uma selfie para gerar a simulação." }, 400);
  }

  if (image.size > MAX_IMAGE_SIZE_BYTES) {
    return jsonResponse({ error: "A imagem precisa ter até 8 MB." }, 400);
  }

  if (procedures.length === 0) {
    return jsonResponse({ error: "Selecione ao menos um procedimento." }, 400);
  }

  const selectedProcedures = getProcedureLabels(procedures);
  const prompt = buildSimulationPrompt(procedures, intensity);
  const apiKey = Netlify.env.get("OPENAI_API_KEY");
  const model = Netlify.env.get("OPENAI_IMAGE_MODEL") || "gpt-image-2";

  if (!apiKey) {
    return jsonResponse({
      simulatedImageUrl: createMockSimulationDataUrl(selectedProcedures),
      selectedProcedures,
      intensity,
      disclaimer,
      mode: "mock"
    });
  }

  const client = new OpenAI({ apiKey });
  const imageFile = await toFile(await image.arrayBuffer(), image.name || "selfie.jpg", {
    type: image.type || "image/jpeg"
  });

  const response = await client.images.edit({
    model,
    image: imageFile,
    prompt,
    n: 1,
    size: "1024x1024",
    quality: "medium",
    input_fidelity: "high",
    output_format: "jpeg"
  });

  const b64Json = response.data?.[0]?.b64_json;

  if (!b64Json) {
    return jsonResponse(
      { error: "Não foi possível gerar a simulação neste momento." },
      502
    );
  }

  return jsonResponse({
    simulatedImageUrl: `data:image/jpeg;base64,${b64Json}`,
    selectedProcedures,
    intensity,
    disclaimer,
    mode: "openai"
  });
};

export const config: Config = {
  path: "/api/generate-simulation",
  method: ["POST", "OPTIONS"]
};
