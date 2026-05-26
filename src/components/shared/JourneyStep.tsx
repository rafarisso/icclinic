import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { JourneyStep as JourneyStepType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { MockImage } from "@/components/shared/MockImage";
import { cn } from "@/lib/utils";

interface JourneyStepProps {
  step: JourneyStepType;
  isLast?: boolean;
}

const statusLabel = {
  completed: "Concluído",
  "in-progress": "Em andamento",
  future: "Futura etapa"
};

export function JourneyStep({ step, isLast = false }: JourneyStepProps) {
  const isCompleted = step.status === "completed";
  const isProgress = step.status === "in-progress";

  return (
    <motion.div whileTap={{ scale: 0.98 }} className="relative flex gap-3 pb-5">
      <div className="relative flex w-7 flex-none justify-center">
        <div
          className={cn(
            "z-10 flex h-7 w-7 items-center justify-center rounded-full border bg-ic-cream",
            isCompleted && "border-ic-gold bg-ic-gold text-ic-white",
            isProgress && "border-ic-gold bg-ic-cream-light",
            step.status === "future" &&
              "border-dashed border-ic-gray-400 bg-ic-cream-light text-ic-gray-400"
          )}
        >
          {isCompleted ? (
            <Check size={15} />
          ) : (
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                isProgress ? "animate-soft-pulse bg-ic-gold" : "bg-ic-gray-400"
              )}
            />
          )}
        </div>
        {!isLast ? (
          <div className="absolute top-7 h-full w-px bg-ic-cream-dark" />
        ) : null}
      </div>
      <div className="flex flex-1 gap-3 rounded-ic-lg bg-ic-cream-light p-3 shadow-ic-card">
        <MockImage label={step.name} className="h-[78px] w-[78px] flex-none" />
        <div className="min-w-0">
          <Badge
            variant={
              isCompleted ? "success" : isProgress ? "default" : "muted"
            }
          >
            {statusLabel[step.status]}
          </Badge>
          <h3 className="mt-2 font-serif text-[20px] font-semibold leading-6 text-ic-black">
            {step.name}
          </h3>
          <p className="mt-1 text-xs leading-5 text-ic-gray-600">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
