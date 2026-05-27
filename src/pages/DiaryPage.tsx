import { Lock, Plus, ShieldCheck } from "lucide-react";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";
import { GoldButton } from "@/components/shared/GoldButton";
import { MockImage } from "@/components/shared/MockImage";
import { useDiary } from "@/hooks/useDiary";
import { showToast } from "@/lib/toast";
import { shortDate } from "@/lib/utils";

export function DiaryPage() {
  const { data, isLoading } = useDiary();

  return (
    <div className="space-y-5 pt-1">
      <section className="text-center">
        <h1 className="font-serif text-[30px] font-medium leading-9 text-ic-black">
          Diário de Evolução
        </h1>
        <p className="mt-1 flex items-center justify-center gap-1 text-[12px] text-ic-gray-600">
          <Lock size={13} className="text-ic-gold" />
          Seu acompanhamento privado e seguro
        </p>
      </section>

      <BeforeAfterSlider
        beforeImageUrl={data?.beforePhotoUrl}
        afterImageUrl={data?.afterPhotoUrl}
        className="h-[284px]"
      />

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-ic-black">
          Seu histórico de evolução
        </h2>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[96px] rounded-ic-lg skeleton" />
            ))
          : data?.entries.map((entry, index) => (
              <div key={entry.id} className="relative flex gap-3">
                <div className="flex w-[52px] flex-none flex-col items-center">
                  <span className="text-[11px] font-semibold text-ic-gold">
                    {shortDate(entry.date)}
                  </span>
                  <span className="mt-2 h-3 w-3 rounded-full bg-ic-gold" />
                  {index !== data.entries.length - 1 ? (
                    <span className="h-full w-px bg-ic-cream-dark" />
                  ) : null}
                </div>
                <article className="mb-4 flex flex-1 gap-3 rounded-ic-lg bg-ic-cream-light p-3 shadow-ic-card">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-[20px] font-semibold leading-6">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-[12px] leading-5 text-ic-gray-600">
                      {entry.description}
                    </p>
                  </div>
                  <MockImage
                    label={entry.title}
                    src={entry.thumbnailUrl}
                    className="h-[72px] w-[72px] flex-none"
                  />
                </article>
              </div>
            ))}
      </section>

      <GoldButton
        className="w-full"
        onClick={() =>
          showToast("Registro de evolução iniciado. Envie foto e observação.")
        }
      >
        <Plus size={18} />
        Adicionar novo registro
      </GoldButton>

      <section className="flex gap-3 rounded-ic-lg border border-ic-cream-dark bg-ic-cream-light p-4 shadow-ic-card">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
          <ShieldCheck size={19} />
        </span>
        <div>
          <h3 className="font-serif text-[21px] font-semibold leading-6">
            Sua evolução registrada com carinho e discrição
          </h3>
          <p className="mt-1 text-[12px] leading-5 text-ic-gray-600">
            Compare resultados e acompanhe sua transformação ao longo do tempo.
          </p>
        </div>
      </section>
    </div>
  );
}
