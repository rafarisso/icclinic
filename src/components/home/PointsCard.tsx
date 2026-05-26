import { ChevronRight, Crown } from "lucide-react";
import { motion } from "framer-motion";

interface PointsCardProps {
  points: number;
}

export function PointsCard({ points }: PointsCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type="button"
      className="flex min-w-[94px] items-center gap-2 rounded-ic-md border border-ic-gold/30 bg-ic-cream-light px-3 py-2 shadow-ic-card"
    >
      <Crown size={16} className="text-ic-gold" />
      <span className="text-sm font-semibold text-ic-black">
        {points.toLocaleString("pt-BR")}
      </span>
      <ChevronRight size={14} className="text-ic-gray-400" />
    </motion.button>
  );
}
