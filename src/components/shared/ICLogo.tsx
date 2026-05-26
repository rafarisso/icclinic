import { cn } from "@/lib/utils";

interface ICLogoProps {
  size?: "small" | "medium" | "large";
  light?: boolean;
  className?: string;
}

const sizeMap = {
  small: {
    initials: "text-[22px]",
    clinic: "text-[7px]",
    doctor: "text-[5px]"
  },
  medium: {
    initials: "text-[34px]",
    clinic: "text-[9px]",
    doctor: "text-[7px]"
  },
  large: {
    initials: "text-[56px]",
    clinic: "text-[13px]",
    doctor: "text-[9px]"
  }
};

export function ICLogo({ size = "small", light = false, className }: ICLogoProps) {
  const styles = sizeMap[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center leading-none",
        light ? "text-ic-cream-light" : "text-ic-black",
        className
      )}
      aria-label="IC Clinic, Dra. Camila Castro"
    >
      <span className={cn("font-serif font-semibold tracking-normal", styles.initials)}>
        IC
      </span>
      <span className={cn("font-sans font-semibold tracking-[0.24em]", styles.clinic)}>
        CLINIC
      </span>
      <span
        className={cn(
          "mt-1 font-sans font-medium tracking-[0.18em] text-ic-gold",
          styles.doctor
        )}
      >
        DRA. CAMILA CASTRO
      </span>
    </div>
  );
}
