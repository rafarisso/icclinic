import { BarChart3, CalendarDays, MessageCircle, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { openWhatsApp } from "@/lib/whatsapp";

const actions = [
  {
    label: "Agendar",
    icon: CalendarDays,
    action: "schedule"
  },
  {
    label: "Reagendar",
    icon: RefreshCcw,
    action: "reschedule"
  },
  {
    label: "Falar com a clínica",
    icon: MessageCircle,
    action: "whatsapp"
  },
  {
    label: "Ver jornada",
    icon: BarChart3,
    action: "journey"
  }
] as const;

export function QuickActions() {
  const navigate = useNavigate();

  const handleAction = (action: (typeof actions)[number]["action"]) => {
    if (action === "whatsapp") {
      openWhatsApp("Olá! Gostaria de falar com a clínica.");
      return;
    }

    if (action === "journey") {
      navigate("/jornada");
      return;
    }

    navigate("/agendar");
  };

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {actions.map((item) => {
        const Icon = item.icon;
        return (
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            key={item.label}
            onClick={() => handleAction(item.action)}
            className="flex h-[86px] flex-col items-center justify-center gap-2 rounded-ic-md border border-ic-gold/22 bg-ic-cream-light px-1.5 text-center shadow-ic-card"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
              <Icon size={18} />
            </span>
            <span className="text-[10.5px] font-semibold leading-3 text-ic-black">
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
