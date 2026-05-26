import { CalendarDays, Clock3, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Appointment } from "@/types";
import { GoldButton } from "@/components/shared/GoldButton";
import { MockImage } from "@/components/shared/MockImage";
import { formatDisplayDate } from "@/lib/utils";

interface NextProcedureCardProps {
  appointment: Appointment;
}

export function NextProcedureCard({ appointment }: NextProcedureCardProps) {
  const navigate = useNavigate();

  return (
    <motion.article
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden rounded-ic-xl bg-ic-charcoal p-4 shadow-ic-elevated"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-ic-gold/20 blur-2xl" />
      <div className="relative z-10 flex min-h-[170px] gap-3">
        <div className="flex flex-1 flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ic-gold-light">
            Próximo procedimento
          </span>
          <h2 className="mt-3 font-serif text-[28px] font-semibold leading-8 text-ic-cream-light">
            {appointment.procedureName}
          </h2>
          <p className="mt-1 text-[13px] text-ic-cream-light/70">
            com {appointment.doctorName}
          </p>
          <div className="mt-4 space-y-2 text-[12px] text-ic-cream-light/82">
            <span className="flex items-center gap-2">
              <CalendarDays size={15} className="text-ic-gold-light" />
              {formatDisplayDate(appointment.date, "dd MMM yyyy")}
            </span>
            <span className="flex items-center gap-2">
              <Clock3 size={15} className="text-ic-gold-light" />
              {appointment.time}
            </span>
          </div>
          <GoldButton
            variant="outline"
            className="mt-auto h-9 min-h-9 w-fit px-3 text-xs text-ic-gold-light"
            onClick={() => navigate(`/agendar?procedure=${appointment.procedureId}`)}
          >
            Ver detalhes
            <ChevronRight size={14} />
          </GoldButton>
        </div>
        <MockImage
          label={appointment.procedureName}
          className="h-[150px] w-[128px] rounded-ic-lg"
          iconClassName="text-ic-charcoal/70"
        />
      </div>
    </motion.article>
  );
}
