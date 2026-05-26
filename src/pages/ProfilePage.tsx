import {
  CalendarCheck,
  ChevronRight,
  FileText,
  Gift,
  History,
  Pencil,
  Settings
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoldButton } from "@/components/shared/GoldButton";
import { MockImage } from "@/components/shared/MockImage";
import { useUser } from "@/hooks/useUser";
import { formatCurrency } from "@/lib/utils";

const menuItems = [
  { label: "Meus Agendamentos", icon: CalendarCheck },
  { label: "Meu Histórico", icon: History },
  { label: "Indique e Ganhe", icon: Gift },
  { label: "Documentos e Anamnese", icon: FileText },
  { label: "Configurações", icon: Settings }
];

export function ProfilePage() {
  const { data: user, isLoading } = useUser();

  return (
    <div className="space-y-5 pt-1">
      <section className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 border-2 border-ic-gold/45 shadow-ic-card">
          <AvatarImage src={user?.avatarUrl} alt={user?.fullName ?? "Paciente"} />
          <AvatarFallback>{user?.firstName.slice(0, 1) ?? "C"}</AvatarFallback>
        </Avatar>
        <h1 className="mt-3 font-serif text-[32px] font-medium leading-9">
          {isLoading ? "Carregando" : user?.fullName}
        </h1>
        <p className="text-[13px] text-ic-gray-600">Paciente IC Clinic</p>
        <GoldButton variant="outline" className="mt-3 h-10 min-h-10 px-4 text-xs">
          <Pencil size={15} />
          Editar perfil
        </GoldButton>
      </section>

      <section className="relative overflow-hidden rounded-ic-xl border border-ic-gold/28 bg-ic-cream-light p-5 shadow-ic-card">
        <div className="absolute right-4 top-4 h-24 w-24">
          <MockImage label="Moeda IC" className="h-full w-full rounded-full" />
        </div>
        <div className="relative max-w-[220px]">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ic-gold">
            Minha carteira
          </span>
          <p className="mt-4 text-[12px] text-ic-gray-600">Créditos disponíveis</p>
          <p className="font-serif text-[31px] font-semibold leading-9 text-ic-black">
            {formatCurrency(user?.credits ?? 0)}
          </p>
          <GoldButton className="mt-4 h-10 min-h-10 px-4 text-xs">
            Adicionar créditos
          </GoldButton>
        </div>
      </section>

      <section className="space-y-2.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              type="button"
              key={item.label}
              className="flex h-14 w-full items-center gap-3 rounded-ic-md bg-ic-cream-light px-4 text-left shadow-ic-card"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ic-gold/12 text-ic-gold">
                <Icon size={18} />
              </span>
              <span className="flex-1 text-sm font-semibold text-ic-black">
                {item.label}
              </span>
              <ChevronRight size={17} className="text-ic-gray-400" />
            </button>
          );
        })}
      </section>
    </div>
  );
}
