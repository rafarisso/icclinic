import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

export function formatDisplayDate(date: string, pattern = "dd 'de' MMMM 'de' yyyy") {
  return format(new Date(`${date}T12:00:00`), pattern, { locale: ptBR });
}

export function shortDate(date: string) {
  return format(new Date(`${date}T12:00:00`), "dd/MM", { locale: ptBR });
}
