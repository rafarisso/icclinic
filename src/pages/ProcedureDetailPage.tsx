import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock,
  MessageCircle,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { GoldButton } from "@/components/shared/GoldButton";
import { MockImage } from "@/components/shared/MockImage";
import { useProcedure } from "@/hooks/useProcedure";
import { openWhatsApp } from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/utils";

function DetailList({
  title,
  items
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
      <h2 className="font-serif text-[24px] font-semibold leading-7 text-ic-black">
        {title}
      </h2>
      <div className="mt-3 space-y-2.5">
        {items.map((item) => (
          <p key={item} className="flex gap-2 text-[13px] leading-5 text-ic-gray-600">
            <CheckCircle2 size={15} className="mt-0.5 flex-none text-ic-gold" />
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}

export function ProcedureDetailPage() {
  const { id = null } = useParams();
  const navigate = useNavigate();
  const { data: procedure, isLoading } = useProcedure(id);

  if (isLoading) {
    return (
      <div className="space-y-4 pt-1">
        <div className="h-64 rounded-ic-xl skeleton" />
        <div className="h-40 rounded-ic-xl skeleton" />
        <div className="h-40 rounded-ic-xl skeleton" />
      </div>
    );
  }

  if (!procedure) {
    return (
      <section className="rounded-ic-xl bg-ic-cream-light p-5 text-center shadow-ic-card">
        <h1 className="font-serif text-[28px] font-semibold">
          Procedimento não encontrado
        </h1>
        <GoldButton className="mt-4 w-full" onClick={() => navigate("/procedimentos")}>
          Ver procedimentos
        </GoldButton>
      </section>
    );
  }

  return (
    <div className="space-y-5 pt-1">
      <section className="overflow-hidden rounded-ic-xl bg-ic-cream-light shadow-ic-card">
        <MockImage
          label={procedure.name}
          src={procedure.imageUrl}
          className="h-[250px] rounded-b-none"
        />
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            {procedure.badge ? <Badge>{procedure.badge}</Badge> : <Badge>IC Clinic</Badge>}
            <span className="rounded-ic-pill bg-ic-cream px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ic-gray-600">
              {procedure.category}
            </span>
          </div>
          <h1 className="mt-3 font-serif text-[34px] font-medium leading-10 text-ic-black">
            {procedure.name}
          </h1>
          <p className="mt-2 text-[13px] leading-5 text-ic-gray-600">
            {procedure.longDescription}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-ic-md bg-ic-cream p-3">
              <p className="flex items-center gap-1 text-[11px] font-semibold text-ic-gold-dark">
                <Clock size={14} />
                Duração
              </p>
              <p className="mt-1 font-serif text-[22px] font-semibold">
                {procedure.duration}
              </p>
            </div>
            <div className="rounded-ic-md bg-ic-cream p-3">
              <p className="text-[11px] font-semibold text-ic-gold-dark">
                Investimento
              </p>
              <p className="mt-1 font-serif text-[22px] font-semibold">
                desde {formatCurrency(procedure.priceFrom)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <DetailList title="Indicado para" items={procedure.idealFor} />
      <DetailList title="Benefícios esperados" items={procedure.benefits} />

      <section className="grid grid-cols-1 gap-3">
        <DetailList title="Preparo" items={procedure.preparation} />
        <DetailList title="Pós-cuidados" items={procedure.aftercare} />
      </section>

      <section className="rounded-ic-xl border border-ic-gold/25 bg-ic-cream-light p-4 shadow-ic-card">
        <div className="flex gap-3">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
            <CalendarDays size={18} />
          </span>
          <div className="space-y-2">
            <h2 className="font-serif text-[24px] font-semibold leading-7">
              Intervalo e manutenção
            </h2>
            <p className="text-[13px] leading-5 text-ic-gray-600">
              {procedure.recommendedInterval}
            </p>
            <p className="text-[13px] leading-5 text-ic-gray-600">
              {procedure.maintenance}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-ic-xl bg-ic-charcoal p-4 text-ic-cream-light shadow-ic-elevated">
        <p className="flex items-start gap-2 text-[13px] leading-5 text-ic-cream-light/82">
          <AlertCircle size={17} className="mt-0.5 flex-none text-ic-gold" />
          {procedure.attention}
        </p>
      </section>

      <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
        <h2 className="font-serif text-[24px] font-semibold leading-7">
          Próximos passos sugeridos
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {procedure.nextSuggestions.map((suggestion) => (
            <span
              key={suggestion}
              className="rounded-ic-pill border border-ic-gold/35 bg-ic-gold/10 px-3 py-1.5 text-[12px] font-semibold text-ic-gold-dark"
            >
              {suggestion}
            </span>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-2.5">
        <GoldButton
          variant="outline"
          onClick={() =>
            openWhatsApp(
              `Olá! Gostaria de tirar uma dúvida sobre ${procedure.name} na IC Clinic.`
            )
          }
        >
          <MessageCircle size={16} />
          Dúvidas
        </GoldButton>
        <GoldButton onClick={() => navigate(`/agendar?procedure=${procedure.id}`)}>
          <CalendarDays size={16} />
          Agendar
        </GoldButton>
      </div>

      <GoldButton
        variant="ghost"
        className="w-full"
        onClick={() => navigate("/simulacao-ia")}
      >
        <Sparkles size={17} />
        Fazer simulação com IA
      </GoldButton>

      <section className="flex gap-3 rounded-ic-lg border border-ic-cream-dark bg-ic-cream-light p-4 shadow-ic-card">
        <ShieldCheck size={19} className="mt-0.5 flex-none text-ic-gold" />
        <p className="text-[12px] leading-5 text-ic-gray-600">
          Toda indicação passa por avaliação individual, consentimento e registro
          seguro no prontuário da paciente.
        </p>
      </section>
    </div>
  );
}
