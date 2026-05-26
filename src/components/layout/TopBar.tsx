import { Bell, Settings, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ICLogo } from "@/components/shared/ICLogo";
import { useAppStore } from "@/store/useAppStore";

export function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const unread = useAppStore(
    (state) => state.notifications.filter((notification) => !notification.read).length
  );
  const isDiary = location.pathname === "/diario";
  const isProfile = location.pathname === "/perfil";

  return (
    <header className="sticky top-0 z-30 flex h-[88px] items-center justify-center bg-ic-cream/92 px-screen-px backdrop-blur-xl">
      <div className="absolute left-screen-px">
        {isDiary ? (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ic-black"
            aria-label="Voltar"
          >
            <ChevronLeft size={22} />
          </button>
        ) : null}
      </div>
      <ICLogo size="medium" />
      <div className="absolute right-screen-px">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ic-cream-light text-ic-black shadow-ic-card"
          aria-label={isProfile ? "Configurações" : "Notificações"}
        >
          {isProfile ? <Settings size={18} /> : <Bell size={18} />}
          {!isProfile && unread > 0 ? (
            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ic-gold px-1 text-[9px] font-semibold text-ic-white">
              {unread}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  );
}
