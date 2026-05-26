import { ChevronRight, Crown, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GoldButton } from "@/components/shared/GoldButton";
import { MockImage } from "@/components/shared/MockImage";
import { NextProcedureCard } from "@/components/home/NextProcedureCard";
import { PointsCard } from "@/components/home/PointsCard";
import { QuickActions } from "@/components/home/QuickActions";
import { useFeaturedProcedures } from "@/hooks/useProcedures";
import { useNextAppointment } from "@/hooks/useAppointments";
import { useUser } from "@/hooks/useUser";

function HomeSkeleton() {
  return (
    <div className="space-y-4 pt-2">
      <div className="h-20 rounded-ic-lg skeleton" />
      <div className="h-44 rounded-ic-xl skeleton" />
      <div className="grid grid-cols-4 gap-2.5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-[86px] rounded-ic-md skeleton" />
        ))}
      </div>
    </div>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const user = useUser();
  const appointment = useNextAppointment();
  const featured = useFeaturedProcedures();

  if (user.isLoading || appointment.isLoading || featured.isLoading) {
    return <HomeSkeleton />;
  }

  const currentUser = user.data;
  const nextAppointment = appointment.data;
  const featuredProcedures = featured.data ?? [];

  if (!currentUser || !nextAppointment) {
    return null;
  }

  return (
    <div className="space-y-5 pt-1">
      <section className="flex items-center gap-3">
        <Avatar className="h-[60px] w-[60px] border-2 border-ic-gold/35">
          <AvatarImage src={currentUser.avatarUrl} alt={currentUser.fullName} />
          <AvatarFallback>{currentUser.firstName.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h1 className="font-serif text-[26px] font-medium leading-8 text-ic-black">
            Olá, {currentUser.firstName}
          </h1>
          <p className="text-[13px] text-ic-gray-600">Bem-vinda de volta!</p>
          <p className="text-[13px] leading-5 text-ic-gray-600">
            Sua jornada de transformação continua aqui.
          </p>
        </div>
        <PointsCard points={currentUser.points} />
      </section>

      <NextProcedureCard appointment={nextAppointment} />

      <QuickActions />

      <motion.section
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/simulacao-ia")}
        className="relative overflow-hidden rounded-ic-xl border border-ic-gold/25 bg-ic-cream-light p-4 shadow-ic-card"
      >
        <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-ic-gold/18 blur-2xl" />
        <div className="relative z-10 flex items-center gap-3">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
            <Sparkles size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ic-gold">
              Novo
            </span>
            <h2 className="font-serif text-[23px] font-semibold leading-7 text-ic-black">
              Simulação com IA
            </h2>
            <p className="mt-1 text-[12px] leading-5 text-ic-gray-600">
              Envie uma selfie e veja uma prévia visual ilustrativa, natural e sutil.
            </p>
          </div>
          <ChevronRight size={19} className="text-ic-gold" />
        </div>
      </motion.section>

      <section className="grid grid-cols-2 gap-3">
        {[
          {
            label: "Pré-cuidados",
            text: "Alguns cuidados importantes para o dia do seu procedimento.",
            icon: ShieldCheck
          },
          {
            label: "Pós-cuidados",
            text: "Seu bem-estar é parte do resultado. Siga as recomendações.",
            icon: Crown
          }
        ].map((card) => {
          const Icon = card.icon;
          return (
            <motion.article
              whileTap={{ scale: 0.98 }}
              key={card.label}
              className="overflow-hidden rounded-ic-lg border border-ic-gold/18 bg-ic-cream-light shadow-ic-card"
            >
              <div className="flex min-h-[112px] flex-col p-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ic-gold">
                  {card.label}
                </span>
                <p className="mt-2 text-[11.5px] leading-4 text-ic-gray-600">
                  {card.text}
                </p>
                <button
                  type="button"
                  className="mt-auto flex items-center gap-1 text-[11px] font-semibold text-ic-gold"
                >
                  Ver orientações
                  <ChevronRight size={13} />
                </button>
              </div>
              <div className="relative h-16 overflow-hidden bg-ic-gold/10">
                <MockImage label={card.label} className="absolute inset-0 rounded-none" />
                <Icon className="absolute bottom-3 right-3 text-ic-cream-light" size={18} />
              </div>
            </motion.article>
          );
        })}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ic-gold">
            Para você
          </span>
          <button
            type="button"
            onClick={() => navigate("/procedimentos")}
            className="text-xs font-semibold text-ic-gray-600"
          >
            Ver todos
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featuredProcedures.slice(0, 2).map((procedure, index) => (
            <motion.article
              whileTap={{ scale: 0.98 }}
              key={procedure.id}
              className="overflow-hidden rounded-ic-lg bg-ic-cream-light shadow-ic-card"
              onClick={() => navigate(`/agendar?procedure=${procedure.id}`)}
            >
              <MockImage label={procedure.name} className="h-[112px] rounded-b-none" />
              <div className="p-3">
                <Badge>{index === 0 ? "Protocolo" : "Em destaque"}</Badge>
                <h3 className="mt-2 font-serif text-[21px] font-semibold leading-6">
                  {index === 0 ? "Glow IC" : procedure.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-[11.5px] leading-4 text-ic-gray-600">
                  {procedure.description}
                </p>
                <button
                  type="button"
                  className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-ic-gold"
                >
                  Conhecer
                  <ChevronRight size={13} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <motion.section
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-ic-xl bg-ic-charcoal p-5 shadow-ic-elevated"
      >
        <div className="absolute inset-y-0 right-0 w-32 opacity-75">
          <MockImage label="Clínica IC" className="h-full rounded-none" />
        </div>
        <div className="relative z-10 max-w-[230px]">
          <p className="font-serif text-[25px] leading-7 text-ic-cream-light">
            Sua jornada de transformação{" "}
            <span className="script-accent">continua aqui.</span>
          </p>
          <p className="mt-3 text-[12px] leading-5 text-ic-cream-light/72">
            Acompanhe sua evolução com exclusividade.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
