import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { openWhatsApp } from "@/lib/whatsapp";

export function WhatsAppFAB() {
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    const seen = window.localStorage.getItem("ic-whatsapp-fab-seen");
    if (!seen) {
      setShouldPulse(true);
      window.localStorage.setItem("ic-whatsapp-fab-seen", "true");
    }
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      type="button"
      onClick={() => openWhatsApp()}
      className={`fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-ic-elevated ${
        shouldPulse ? "animate-wa-pulse" : ""
      } md:left-[calc(50%+139px)] md:right-auto`}
      aria-label="Abrir conversa no WhatsApp da IC Clinic"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill="#FFFFFF"
          d="M16.04 4C9.42 4 4.04 9.35 4.04 15.93c0 2.1.55 4.14 1.6 5.94L4 28l6.3-1.61a12.08 12.08 0 0 0 5.73 1.46h.01c6.61 0 11.99-5.35 11.99-11.93C28.03 9.35 22.65 4 16.04 4Zm0 21.84h-.01a9.98 9.98 0 0 1-5.08-1.39l-.37-.22-3.74.95 1-3.63-.24-.38a9.83 9.83 0 0 1-1.52-5.24c0-5.47 4.47-9.92 9.96-9.92 2.66 0 5.16 1.03 7.03 2.91a9.82 9.82 0 0 1 2.92 7c0 5.47-4.47 9.92-9.95 9.92Zm5.46-7.42c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.46-2.42-1.48a9.04 9.04 0 0 1-1.67-2.07c-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.58-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.62.71.23 1.36.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35Z"
        />
      </svg>
    </motion.button>
  );
}
