import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import { addMonths, format, getDay, getDaysInMonth, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { GoldButton } from "@/components/shared/GoldButton";
import { MockImage } from "@/components/shared/MockImage";
import { useProcedure } from "@/hooks/useProcedure";
import { cn, formatDisplayDate } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";

const weekdayLabels = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
const weekdayTimes = ["09:00", "10:30", "14:00", "15:30", "17:00"];
const saturdayTimes = ["09:00", "10:00", "11:30", "13:00"];

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function isBusinessDate(date: Date) {
  const day = getDay(date);
  return day >= 1 && day <= 6;
}

function isAvailableDate(date: Date, today: Date) {
  return isBusinessDate(date) && date.getTime() >= today.getTime();
}

function getTimesForDate(date: Date) {
  return getDay(date) === 6 ? saturdayTimes : weekdayTimes;
}

function getFirstAvailableDay(month: Date, today: Date) {
  const daysInMonth = getDaysInMonth(month);

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    if (isAvailableDate(date, today)) {
      return day;
    }
  }

  return 1;
}

export function SchedulePage() {
  const [searchParams] = useSearchParams();
  const procedureId = searchParams.get("procedure");
  const { data: procedure, isLoading } = useProcedure(procedureId);
  const [today] = useState(() => startOfToday());
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDay, setSelectedDay] = useState(() =>
    getFirstAvailableDay(new Date(today.getFullYear(), today.getMonth(), 1), today)
  );
  const [selectedTime, setSelectedTime] = useState(() => getTimesForDate(today)[1]);
  const [successOpen, setSuccessOpen] = useState(false);

  const monthDays = useMemo(() => {
    const firstDay = getDay(visibleMonth);
    const daysInMonth = getDaysInMonth(visibleMonth);
    const blanks = Array.from({ length: firstDay }, () => null);
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    return [...blanks, ...days];
  }, [visibleMonth]);

  const selectedDateObject = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    selectedDay
  );
  const times = getTimesForDate(selectedDateObject);
  const selectedProcedureName = procedure?.name ?? "Skin Booster";
  const selectedDate = format(selectedDateObject, "yyyy-MM-dd");
  const location =
    "IC Clinic, Av. Manuel Alves Soares, 437, sala 4, Parque Colonial, São Paulo";

  const moveMonth = (direction: "previous" | "next") => {
    const nextMonth =
      direction === "previous" ? subMonths(visibleMonth, 1) : addMonths(visibleMonth, 1);
    const firstAvailableDay = getFirstAvailableDay(nextMonth, today);
    const nextDate = new Date(
      nextMonth.getFullYear(),
      nextMonth.getMonth(),
      firstAvailableDay
    );

    setVisibleMonth(nextMonth);
    setSelectedDay(firstAvailableDay);
    setSelectedTime(getTimesForDate(nextDate)[0]);
  };

  return (
    <div className="space-y-5 pt-1">
      <section className="text-center">
        <h1 className="font-serif text-[30px] font-medium leading-9 text-ic-black">
          Agendar consulta
        </h1>
        <p className="mx-auto mt-1 max-w-[285px] text-[13px] leading-5 text-ic-gray-600">
          Escolha o melhor momento para a sua próxima etapa.
        </p>
      </section>

      <section className="flex items-center gap-3 rounded-ic-lg border border-ic-cream-dark bg-ic-cream-light p-3 shadow-ic-card">
        {isLoading ? (
          <div className="h-14 w-14 rounded-full skeleton" />
        ) : (
          <MockImage
            label={selectedProcedureName}
            src={procedure?.imageUrl ?? "/mockups/skin-booster.jpg"}
            className="h-14 w-14 rounded-full"
          />
        )}
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-[22px] font-semibold leading-6">
            {selectedProcedureName}
          </h2>
          <p className="text-[12px] text-ic-gray-600">com Dra. Camila Castro</p>
        </div>
        <ChevronRight size={18} className="text-ic-gray-400" />
      </section>

      <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => moveMonth("previous")}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ic-gold"
            aria-label="Mês anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="font-serif text-[23px] font-semibold capitalize">
            {format(visibleMonth, "MMMM yyyy", { locale: ptBR })}
          </h2>
          <button
            type="button"
            onClick={() => moveMonth("next")}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ic-gold"
            aria-label="Próximo mês"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
          {weekdayLabels.map((day) => (
            <span
              key={day}
              className="py-1 text-[10px] font-semibold tracking-[0.14em] text-ic-gold"
            >
              {day}
            </span>
          ))}
          {monthDays.map((day, index) => {
            const date =
              typeof day === "number"
                ? new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day)
                : null;
            const available = Boolean(date && isAvailableDate(date, today));
            const selected = Boolean(day && day === selectedDay && available);

            return (
              <button
                type="button"
                key={`${day ?? "blank"}-${index}`}
                disabled={!available}
                onClick={() => {
                  if (!date || typeof day !== "number") return;
                  setSelectedDay(day);
                  setSelectedTime(getTimesForDate(date)[0]);
                }}
                className={cn(
                  "relative flex h-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  !day && "pointer-events-none",
                  day && !available && "text-ic-gray-400",
                  available && "text-ic-black",
                  selected && "bg-ic-gold text-ic-white"
                )}
              >
                {day}
                {available && !selected ? (
                  <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-ic-gold" />
                ) : null}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <p className="text-[13px] font-semibold text-ic-black">
          Horários disponíveis para {format(selectedDateObject, "dd/MM")}
        </p>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {times.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setSelectedTime(time)}
              className={cn(
                "h-10 rounded-ic-pill border border-ic-cream-dark text-xs font-semibold shadow-ic-card",
                selectedTime === time
                  ? "bg-ic-black text-ic-cream-light"
                  : "bg-ic-cream-light text-ic-black"
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </section>

      <section className="flex gap-3 rounded-ic-lg border border-ic-gold/28 bg-ic-cream-light p-4 shadow-ic-card">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
          <Bell size={18} />
        </span>
        <div>
          <h3 className="font-serif text-[22px] font-semibold leading-6 text-ic-gold-dark">
            Pré-confirmação
          </h3>
          <p className="mt-1 text-[12px] leading-5 text-ic-gray-600">
            Reservamos este horário por 10 minutos. A confirmação final acontece com a
            equipe da clínica.
          </p>
        </div>
      </section>

      <section className="rounded-ic-xl bg-ic-cream-light p-4 shadow-ic-card">
        <div className="flex gap-3">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
            <CalendarDays size={22} />
          </span>
          <div className="space-y-3 text-[13px] leading-5 text-ic-gray-600">
            <p>
              <strong className="text-ic-black">Procedimento:</strong>{" "}
              {selectedProcedureName} com Dra. Camila Castro
            </p>
            <p>
              <strong className="text-ic-black">Data:</strong>{" "}
              {formatDisplayDate(selectedDate)}
            </p>
            <p>
              <strong className="text-ic-black">Horário:</strong> {selectedTime}
            </p>
            <p className="flex gap-1">
              <MapPin size={15} className="mt-0.5 flex-none text-ic-gold" />
              <span>
                <strong className="text-ic-black">Local:</strong> {location}
              </span>
            </p>
          </div>
        </div>
      </section>

      <GoldButton className="w-full" onClick={() => setSuccessOpen(true)}>
        Confirmar agendamento
      </GoldButton>
      <p className="text-center text-[12px] text-ic-gray-600">
        Atendimento simulado de segunda a sábado em horário comercial.
      </p>

      <AnimatePresence>
        {successOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end bg-ic-black/35 px-screen-px pb-6 md:left-1/2 md:w-[430px] md:-translate-x-1/2"
          >
            <motion.div
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              className="w-full rounded-ic-xl bg-ic-cream-light p-5 shadow-ic-elevated"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ic-success/18 text-ic-success">
                    <Clock3 size={22} />
                  </span>
                  <h2 className="mt-4 font-serif text-[28px] font-semibold leading-8">
                    Agendamento solicitado
                  </h2>
                  <p className="mt-2 text-[13px] leading-5 text-ic-gray-600">
                    A clínica receberá esta intenção de consulta e pode confirmar,
                    ajustar ou reagendar pelo painel interno.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSuccessOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ic-cream"
                  aria-label="Fechar confirmação"
                >
                  <X size={18} />
                </button>
              </div>
              <GoldButton
                className="mt-5 w-full"
                onClick={() =>
                  openWhatsApp(
                    `Olá! Acabei de agendar ${selectedProcedureName} com Dra. Camila Castro para ${formatDisplayDate(selectedDate)} às ${selectedTime}. Gostaria de confirmar.`
                  )
                }
              >
                Confirmar pelo WhatsApp
              </GoldButton>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
