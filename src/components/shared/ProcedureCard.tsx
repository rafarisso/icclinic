import { Clock, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Procedure } from "@/types";
import { Badge } from "@/components/ui/badge";
import { GoldButton } from "@/components/shared/GoldButton";
import { MockImage } from "@/components/shared/MockImage";
import { formatCurrency } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";
import { showToast } from "@/lib/toast";

interface ProcedureCardProps {
  procedure: Procedure;
}

export function ProcedureCard({ procedure }: ProcedureCardProps) {
  const navigate = useNavigate();

  return (
    <motion.article
      whileTap={{ scale: 0.98 }}
      onClick={() => showToast("Detalhes do procedimento em breve.")}
      className="rounded-ic-lg border border-ic-cream-dark bg-ic-cream-light p-3 shadow-ic-card"
    >
      <div className="flex gap-3">
        <MockImage
          label={procedure.name}
          className="h-[116px] w-[116px] flex-none"
        />
        <div className="min-w-0 flex-1">
          <div className="flex min-h-6 items-start justify-between gap-2">
            {procedure.badge ? <Badge>{procedure.badge}</Badge> : <span />}
            <span className="rounded-ic-pill bg-ic-cream px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ic-gray-600">
              {procedure.category}
            </span>
          </div>
          <h3 className="mt-2 font-serif text-[21px] font-semibold leading-6 text-ic-black">
            {procedure.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-ic-gray-600">
            {procedure.description}
          </p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="text-[11px] text-ic-gray-600">
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-ic-gold" />
                {procedure.duration}
              </span>
              <span className="mt-1 block font-semibold text-ic-black">
                desde {formatCurrency(procedure.priceFrom)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openWhatsApp(
                    `Olá! Gostaria de tirar uma dúvida sobre ${procedure.name} na IC Clinic.`
                  );
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ic-gold/45 text-ic-gold"
                aria-label={`Tirar dúvidas sobre ${procedure.name} pelo WhatsApp`}
              >
                <MessageCircle size={16} />
              </button>
              <GoldButton
                className="h-9 min-h-9 px-3 text-xs"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/agendar?procedure=${procedure.id}`);
                }}
              >
                Agendar
              </GoldButton>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
