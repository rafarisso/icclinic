export const CLINIC_WHATSAPP = "5511915580633";

export const openWhatsApp = (message?: string) => {
  const defaultMessage =
    "Olá! Vim pelo aplicativo da IC Clinic e gostaria de tirar uma dúvida.";
  const text = encodeURIComponent(message || defaultMessage);
  window.open(`https://wa.me/${CLINIC_WHATSAPP}?text=${text}`, "_blank");
};
