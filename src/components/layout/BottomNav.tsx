import { BookOpen, Home, Sparkles, UserRound, WandSparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Início", path: "/", icon: Home },
  { label: "Procedimentos", path: "/procedimentos", icon: Sparkles },
  { label: "Jornada", path: "/jornada", icon: WandSparkles },
  { label: "Diário", path: "/diario", icon: BookOpen },
  { label: "Perfil", path: "/perfil", icon: UserRound }
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-[430px] border-t border-ic-cream-dark/70 bg-ic-cream-light/88 px-2 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl">
      <div className="grid grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "relative flex min-h-[54px] flex-col items-center justify-center gap-1 rounded-ic-md text-[10px] font-semibold text-ic-gray-400 transition-colors",
                  isActive && "text-ic-gold"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      "absolute top-0 h-1 w-7 rounded-b-ic-pill bg-transparent",
                      isActive && "bg-ic-gold"
                    )}
                  />
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="leading-none">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
