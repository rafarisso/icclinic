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

function createMockSimulationUrl() {
  return "/mockups/simulation-result.jpg";
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
      simulatedImageUrl: createMockSimulationUrl(),
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

  try {
    const response = await client.images.edit({
      model,
      image: imageFile,
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "medium",
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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("OpenAI image generation failed:", message);
    return jsonResponse(
      { error: "Não foi possível gerar a simulação neste momento." },
      502
    );
  }
};

export const config: Config = {
  path: "/api/generate-simulation",
  method: ["POST", "OPTIONS"]
};
