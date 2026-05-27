import { useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MIN_POSITION = 0;
const MAX_POSITION = 100;
const START_POSITION = 50;

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeLabel = "Antes",
  afterLabel = "Depois",
  beforeImageUrl,
  afterImageUrl,
  className
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(START_POSITION);
  const [dragging, setDragging] = useState(false);

  const updatePosition = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(MAX_POSITION, Math.max(MIN_POSITION, percent)));
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[280px] overflow-hidden rounded-ic-lg border border-ic-gold/25 shadow-ic-card",
        className
      )}
      onPointerDown={(event) => {
        setDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
        updatePosition(event.clientX);
      }}
      onPointerMove={(event) => {
        if (dragging) updatePosition(event.clientX);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      onDoubleClick={() => setPosition(START_POSITION)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setPosition((current) => Math.max(MIN_POSITION, current - 2));
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          setPosition((current) => Math.min(MAX_POSITION, current + 2));
        }

        if (event.key === "Home") {
          event.preventDefault();
          setPosition(MIN_POSITION);
        }

        if (event.key === "End") {
          event.preventDefault();
          setPosition(MAX_POSITION);
        }

        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          setPosition(START_POSITION);
        }
      }}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
    >
      {afterImageUrl ? (
        <img
          src={afterImageUrl}
          alt={afterLabel}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_28%,rgba(250,245,236,0.55),transparent_28%),linear-gradient(135deg,#b6a08a,#2d2620)]" />
      )}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {beforeImageUrl ? (
          <img
            src={beforeImageUrl}
            alt={beforeLabel}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_38%_35%,rgba(250,245,236,0.68),transparent_28%),linear-gradient(135deg,#eadccc,#9a7752)]" />
        )}
      </div>
      <div
        className="absolute inset-y-0 z-10 w-px bg-ic-gold-light"
        style={{ left: `${position}%` }}
      />
      <button
        type="button"
        className="absolute top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ic-gold text-ic-white shadow-ic-elevated"
        style={{ left: `${position}%` }}
        aria-label="Arrastar comparador"
      >
        <ChevronsLeftRight size={20} />
      </button>
      <span className="absolute bottom-3 left-3 z-20 rounded-ic-pill bg-ic-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ic-white">
        {beforeLabel}
      </span>
      <span className="absolute bottom-3 right-3 z-20 rounded-ic-pill bg-ic-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ic-white">
        {afterLabel}
      </span>
    </div>
  );
}
