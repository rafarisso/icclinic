import {
  ArrowRight,
  Camera,
  Clock3,
  Check,
  Download,
  Image as ImageIcon,
  ImagePlus,
  Loader2,
  RefreshCcw,
  Sparkles,
  X
} from "lucide-react";
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import { SimulationDisclaimer } from "@/components/simulation/SimulationDisclaimer";
import { GoldButton } from "@/components/shared/GoldButton";
import { downloadImageUrl } from "@/lib/downloadImage";
import { cn } from "@/lib/utils";
import { simulationService } from "@/services/simulationService";
import type { SimulationProcedure } from "@/types";

const procedures: Array<{ id: SimulationProcedure; label: string }> = [
  { id: "botox", label: "Botox" },
  { id: "nariz", label: "Nariz" },
  { id: "labios", label: "Lábios" },
  { id: "limpeza", label: "Limpeza de pele" }
];

const loadingMessages = [
  {
    title: "Preparando sua selfie",
    body: "Ajustando luz, enquadramento e qualidade da imagem."
  },
  {
    title: "Preservando seus traços",
    body: "A simulação mantém identidade facial, expressão e naturalidade."
  },
  {
    title: "Aplicando os pontos escolhidos",
    body: "Botox, pele, nariz ou lábios são tratados de forma sutil."
  },
  {
    title: "Refinando a prévia visual",
    body: "Buscando um resultado delicado, realista e harmônico."
  },
  {
    title: "Finalizando a simulação",
    body: "A imagem pode levar mais um pouco em horários de maior uso."
  }
];

function formatElapsedTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(
    2,
    "0"
  )}`;
}

function getLoadingMessageIndex(seconds: number) {
  return Math.min(loadingMessages.length - 1, Math.floor(seconds / 10));
}

export function SimulationUploadPage() {
  const navigate = useNavigate();
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [isCameraStarting, setIsCameraStarting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selected, setSelected] = useState<SimulationProcedure[]>(["limpeza"]);
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => Boolean(file && selected.length > 0 && consent && !isLoading),
    [consent, file, isLoading, selected.length]
  );
  const currentLoadingMessage =
    loadingMessages[getLoadingMessageIndex(elapsedSeconds)];
  const loadingProgress = Math.min(94, 12 + elapsedSeconds * 2);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOpen(false);
    setIsCameraStarting(false);

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (cameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      void videoRef.current.play();
    }
  }, [cameraOpen]);

  useEffect(() => {
    return () => {
      stopCamera();
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!isLoading) {
      setElapsedSeconds(0);
      return;
    }

    const startedAt = Date.now();
    setElapsedSeconds(0);

    const timer = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isLoading]);

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
    stopCamera();
    event.target.value = "";
  };

  const startCamera = async () => {
    setError(null);
    setIsCameraStarting(true);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        cameraInputRef.current?.click();
        return;
      }

      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 1280 }
        },
        audio: false
      });

      streamRef.current = stream;
      setCameraOpen(true);
    } catch {
      cameraInputRef.current?.click();
    } finally {
      setIsCameraStarting(false);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1080;
    canvas.height = video.videoHeight || 1080;

    const context = canvas.getContext("2d");
    if (!context) {
      setError("Não foi possível capturar a foto.");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("Não foi possível capturar a foto.");
          return;
        }

        selectFile(
          new File([blob], "selfie-ic-clinic.jpg", {
            type: "image/jpeg"
          })
        );
        stopCamera();
      },
      "image/jpeg",
      0.92
    );
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0] ?? null;
    if (droppedFile?.type.startsWith("image/")) {
      selectFile(droppedFile);
      stopCamera();
      return;
    }

    setError("Escolha um arquivo de imagem válido.");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError("Envie uma selfie para gerar a simulação.");
      return;
    }

    setIsLoading(true);
    setError(null);
    stopCamera();

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
        <div
          className={cn(
            "relative h-[430px] overflow-hidden rounded-ic-lg border bg-ic-cream-light shadow-ic-card transition-colors",
            isDragging ? "border-ic-gold" : "border-ic-gold/18"
          )}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {cameraOpen ? (
            <video
              ref={videoRef}
              className="h-full w-full bg-ic-black object-cover"
              autoPlay
              muted
              playsInline
            />
          ) : previewUrl ? (
            <img
              src={previewUrl}
              alt="Selfie selecionada"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-8 text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
                <Camera size={30} />
              </span>
              <p className="mt-5 font-serif text-[27px] font-semibold leading-8 text-ic-black">
                Envie sua selfie
              </p>
              <p className="mt-2 max-w-[260px] text-[12px] leading-5 text-ic-gray-600">
                Abra a câmera ou escolha uma foto frontal em seus arquivos.
              </p>
            </div>
          )}
          <div className="pointer-events-none absolute inset-7">
            <span className="absolute left-0 top-0 h-16 w-16 rounded-tl-[28px] border-l border-t border-ic-gold-light" />
            <span className="absolute right-0 top-0 h-16 w-16 rounded-tr-[28px] border-r border-t border-ic-gold-light" />
            <span className="absolute bottom-0 left-0 h-16 w-16 rounded-bl-[28px] border-b border-l border-ic-gold-light" />
            <span className="absolute bottom-0 right-0 h-16 w-16 rounded-br-[28px] border-b border-r border-ic-gold-light" />
          </div>
          {previewUrl ? (
            <button
              type="button"
              onClick={() => selectFile(null)}
              disabled={isLoading}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ic-cream-light/92 text-ic-gold shadow-ic-card backdrop-blur"
              aria-label="Trocar foto"
            >
              <RefreshCcw size={17} />
            </button>
          ) : null}
          {cameraOpen ? (
            <div className="absolute inset-x-4 bottom-4 z-20 grid grid-cols-[1fr_auto] gap-2">
              <GoldButton
                type="button"
                onClick={capturePhoto}
                className="h-[52px] min-h-0 rounded-ic-pill border border-ic-cream-light/45 text-[14px] shadow-ic-elevated"
              >
                <Camera size={17} />
                Capturar foto
              </GoldButton>
              <button
                type="button"
                onClick={stopCamera}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-ic-cream-light/55 bg-ic-cream-light/92 text-ic-gold shadow-ic-elevated backdrop-blur"
                aria-label="Cancelar câmera"
              >
                <X size={18} />
              </button>
            </div>
          ) : null}
          {isLoading ? (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-ic-black/58 px-6 text-center text-ic-white backdrop-blur-[2px]">
              <div className="w-full max-w-[285px] rounded-ic-lg border border-ic-gold/35 bg-ic-black/56 p-5 shadow-ic-card">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-ic-gold/40 bg-ic-gold/18 text-ic-gold">
                  <Loader2 size={24} className="animate-spin" />
                </span>
                <p className="mt-4 font-serif text-[25px] leading-7">
                  {currentLoadingMessage.title}
                </p>
                <p className="mt-2 text-[12px] leading-5 text-ic-white/78">
                  {currentLoadingMessage.body}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-[13px] font-semibold text-ic-gold-light">
                  <Clock3 size={15} />
                  {formatElapsedTime(elapsedSeconds)}
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ic-white/18">
                  <div
                    className="h-full rounded-full bg-ic-gold transition-all duration-700"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <p className="mt-3 text-[11px] leading-4 text-ic-white/62">
                  Mantenha esta página aberta enquanto a prévia é gerada.
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <p className="mt-3 flex items-center justify-center gap-2 text-[12px] text-ic-gray-600">
          <ImagePlus size={14} className="text-ic-gold" />
          A imagem será usada apenas para gerar uma prévia ilustrativa.
        </p>
        {previewUrl ? (
          <button
            type="button"
            onClick={() =>
              downloadImageUrl(previewUrl, "ic-clinic-selfie-original.jpg")
            }
            disabled={isLoading}
            className="mx-auto mt-3 flex h-10 items-center justify-center gap-2 rounded-ic-pill border border-ic-gold/35 bg-ic-cream-light px-4 text-[12px] font-semibold text-ic-gold-dark shadow-ic-card"
          >
            <Download size={14} />
            Salvar selfie
          </button>
        ) : null}
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
            onClick={() => void startCamera()}
            disabled={isLoading}
            className="flex h-16 items-center justify-center gap-2 rounded-ic-md border border-ic-cream-dark bg-ic-cream-light text-sm font-semibold text-ic-black shadow-ic-card"
          >
            <Camera size={18} className="text-ic-gold" />
            {isCameraStarting ? "Abrindo..." : "Abrir câmera"}
          </button>
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            disabled={isLoading}
            className="flex h-16 items-center justify-center gap-2 rounded-ic-md border border-ic-cream-dark bg-ic-cream-light text-sm font-semibold text-ic-black shadow-ic-card"
          >
            <ImageIcon size={18} className="text-ic-gold" />
            Escolher foto
          </button>
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

      <GoldButton type="submit" className="w-full" disabled={!canSubmit}>
        {isLoading
          ? `Gerando prévia ${formatElapsedTime(elapsedSeconds)}`
          : "Continuar"}
        {!isLoading ? <ArrowRight size={17} /> : null}
      </GoldButton>
    </form>
  );
}
