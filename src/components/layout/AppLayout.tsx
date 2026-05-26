import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "@/components/layout/BottomNav";
import { TopBar } from "@/components/layout/TopBar";
import { WhatsAppFAB } from "@/components/shared/WhatsAppFAB";
import { addToastListener } from "@/lib/toast";

export function AppLayout() {
  const location = useLocation();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    return addToastListener((message) => {
      setToast(message);
      window.setTimeout(() => setToast(null), 2600);
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ic-cream">
      <TopBar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="px-screen-px pb-28"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <WhatsAppFAB />
      <BottomNav />
      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-[148px] left-1/2 z-50 w-[calc(100%-40px)] max-w-[390px] -translate-x-1/2 rounded-ic-md bg-ic-black px-4 py-3 text-center text-sm font-medium text-ic-cream-light shadow-ic-elevated"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
