import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface MockImageProps {
  label: string;
  src?: string;
  className?: string;
  iconClassName?: string;
  imageClassName?: string;
}

export function MockImage({
  label,
  src,
  className,
  iconClassName,
  imageClassName
}: MockImageProps) {
  return (
    <div
      className={cn(
        "photo-lux relative flex items-center justify-center overflow-hidden rounded-ic-md",
        className
      )}
      aria-label={label}
    >
      {src ? (
        <img
          src={src}
          alt={label}
          className={cn("h-full w-full object-cover", imageClassName)}
          loading="lazy"
        />
      ) : (
        <>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ic-black/35 to-transparent" />
          <Sparkles
            className={cn("relative z-10 text-ic-cream-light/90", iconClassName)}
            size={24}
          />
        </>
      )}
    </div>
  );
}
