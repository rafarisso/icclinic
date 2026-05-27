import { icTheme } from "@/lib/theme";

interface BeforeAfterDownloadParams {
  beforeImageUrl: string;
  afterImageUrl: string;
  selectedProcedures: string[];
  filename?: string;
}

const comparisonCanvas = {
  width: 1200,
  height: 1500,
  padding: 64,
  imageTop: 330,
  imageHeight: 900,
  imageRadius: 28
};

function triggerDownload(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function downloadImageUrl(url: string, filename: string) {
  triggerDownload(url, filename);
}

function loadCanvasImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    if (!src.startsWith("data:") && !src.startsWith("blob:")) {
      image.crossOrigin = "anonymous";
    }

    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("Não foi possível preparar a imagem para salvar."));
    image.src = src;
  });
}

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  const sourceX = (image.naturalWidth - sourceWidth) / 2;
  const sourceY = (image.naturalHeight - sourceHeight) / 2;

  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    x,
    y,
    width,
    height
  );
}

function drawLabel(
  context: CanvasRenderingContext2D,
  label: string,
  centerX: number,
  y: number
) {
  const width = 245;
  const height = 62;
  const x = centerX - width / 2;

  context.save();
  drawRoundedRect(context, x, y, width, height, 20);
  context.fillStyle = icTheme.colors.gold;
  context.fill();
  context.fillStyle = icTheme.colors.white;
  context.font = `600 30px ${icTheme.fonts.serif}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(label, centerX, y + height / 2 + 1);
  context.restore();
}

function drawImageCard(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  context.save();
  context.fillStyle = icTheme.colors.creamDark;
  drawRoundedRect(context, x - 2, y - 2, width + 4, height + 4, 30);
  context.fill();
  drawRoundedRect(context, x, y, width, height, comparisonCanvas.imageRadius);
  context.clip();
  drawCoverImage(context, image, x, y, width, height);
  context.restore();
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Não foi possível salvar a imagem."));
          return;
        }

        resolve(blob);
      },
      "image/jpeg",
      0.92
    );
  });
}

export async function downloadBeforeAfterImage({
  beforeImageUrl,
  afterImageUrl,
  selectedProcedures,
  filename = "ic-clinic-antes-e-depois.jpg"
}: BeforeAfterDownloadParams) {
  const [beforeImage, afterImage] = await Promise.all([
    loadCanvasImage(beforeImageUrl),
    loadCanvasImage(afterImageUrl)
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = comparisonCanvas.width;
  canvas.height = comparisonCanvas.height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Não foi possível salvar a comparação.");
  }

  context.fillStyle = icTheme.colors.creamLight;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = icTheme.colors.goldDark;
  context.font = `500 54px ${icTheme.fonts.serif}`;
  context.textAlign = "center";
  context.fillText("IC CLINIC", canvas.width / 2, 92);

  context.fillStyle = icTheme.colors.gray600;
  context.font = `600 22px ${icTheme.fonts.sans}`;
  context.letterSpacing = "5px";
  context.fillText("SIMULAÇÃO ESTÉTICA COM IA", canvas.width / 2, 138);
  context.letterSpacing = "0px";

  context.fillStyle = icTheme.colors.goldDark;
  context.font = `500 72px ${icTheme.fonts.serif}`;
  context.fillText("Antes e depois", canvas.width / 2, 230);

  context.fillStyle = icTheme.colors.black;
  context.font = `500 32px ${icTheme.fonts.serif}`;
  context.fillText("Prévia visual ilustrativa", canvas.width / 2, 282);

  const gap = 28;
  const imageWidth =
    (canvas.width - comparisonCanvas.padding * 2 - gap) / 2;
  const beforeX = comparisonCanvas.padding;
  const afterX = beforeX + imageWidth + gap;

  drawImageCard(
    context,
    beforeImage,
    beforeX,
    comparisonCanvas.imageTop,
    imageWidth,
    comparisonCanvas.imageHeight
  );
  drawImageCard(
    context,
    afterImage,
    afterX,
    comparisonCanvas.imageTop,
    imageWidth,
    comparisonCanvas.imageHeight
  );

  drawLabel(context, "Antes", beforeX + imageWidth / 2, comparisonCanvas.imageTop);
  drawLabel(
    context,
    "Simulação",
    afterX + imageWidth / 2,
    comparisonCanvas.imageTop
  );

  const procedures = selectedProcedures.length
    ? selectedProcedures.join(" • ")
    : "Simulação ilustrativa";

  context.fillStyle = icTheme.colors.black;
  context.font = `600 28px ${icTheme.fonts.sans}`;
  context.fillText(procedures, canvas.width / 2, 1302);

  drawRoundedRect(context, 165, 1350, 870, 72, 36);
  context.strokeStyle = icTheme.colors.goldLight;
  context.lineWidth = 2;
  context.stroke();
  context.fillStyle = icTheme.colors.gray600;
  context.font = `500 24px ${icTheme.fonts.sans}`;
  context.fillText(
    "Simulação ilustrativa, não substitui avaliação profissional",
    canvas.width / 2,
    1395
  );

  const blob = await canvasToBlob(canvas);
  const url = URL.createObjectURL(blob);

  try {
    triggerDownload(url, filename);
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
