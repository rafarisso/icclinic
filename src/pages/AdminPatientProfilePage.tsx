import { CalendarDays, ImagePlus, Sparkles, UserRound } from "lucide-react";
import { useParams } from "react-router-dom";
import { GoldButton } from "@/components/shared/GoldButton";
import { MockImage } from "@/components/shared/MockImage";
import { useAdminPatient } from "@/hooks/useAdminPatients";
import { showToast } from "@/lib/toast";
import { formatDisplayDate } from "@/lib/utils";

const timelineStatus = {
  planned: "Planejado",
  done: "Realizado",
  follow_up: "Follow-up"
};

export function AdminPatientProfilePage() {
  const { id = "patient-1" } = useParams();
  const { data, isLoading } = useAdminPatient(id);

  if (isLoading || !data?.patient) {
    return (
      <div className="space-y-4 pt-1">
        <div className="h-28 rounded-ic-xl skeleton" />
        <div className="h-44 rounded-ic-xl skeleton" />
      </div>
    );
  }

  const { patient, timeline, photos, simulations } = data;

  return (
    <div className="space-y-5 pt-1">
      <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
            <UserRound size={24} />
          </span>
          <div>
            <h1 className="font-serif text-[30px] font-medium leading-8">
              {patient.name}
            </h1>
            <p className="text-[12px] leading-5 text-ic-gray-600">
              {patient.phone} · {patient.email}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-[25px] font-semibold leading-7">
            Linha do tempo
          </h2>
          <CalendarDays size={18} className="text-ic-gold" />
        </div>
        <div className="space-y-3">
          {timeline.map((item) => (
            <article
              key={item.id}
              className="rounded-ic-md border border-ic-cream-dark bg-ic-cream p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-serif text-[21px] font-semibold leading-6">
                  {item.procedureName}
                </p>
                <span className="rounded-ic-pill bg-ic-gold/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ic-gold-dark">
                  {timelineStatus[item.status]}
                </span>
              </div>
              <p className="mt-1 text-[12px] text-ic-gray-600">
                {formatDisplayDate(item.date)}
              </p>
              <p className="mt-2 text-[12px] leading-5 text-ic-gray-600">
                {item.notes}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {photos.map((photo) => (
          <article
            key={photo.id}
            className="overflow-hidden rounded-ic-lg bg-ic-cream-light shadow-ic-card"
          >
            <MockImage
              label={photo.type}
              src={photo.imageUrl}
              className="h-32 rounded-b-none"
            />
            <div className="p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ic-gold">
                Foto {photo.type}
              </p>
              <p className="mt-1 text-[12px] text-ic-gray-600">
                Consentimento: {photo.consentGiven ? "sim" : "pendente"}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
            <Sparkles size={19} />
          </span>
          <div>
            <h2 className="font-serif text-[24px] font-semibold leading-7">
              Histórico de simulações
            </h2>
            <p className="text-[12px] text-ic-gray-600">
              {simulations.length} simulação registrada
            </p>
          </div>
        </div>
      </section>

      <GoldButton
        variant="outline"
        className="w-full"
        onClick={() => showToast("Upload de foto autorizada iniciado.")}
      >
        <ImagePlus size={17} />
        Adicionar foto autorizada
      </GoldButton>
    </div>
  );
}
