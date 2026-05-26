const TOAST_EVENT = "ic-toast";

export const showToast = (message: string) => {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
};

export const addToastListener = (handler: (message: string) => void) => {
  const listener = (event: Event) => {
    const customEvent = event as CustomEvent<string>;
    handler(customEvent.detail);
  };

  window.addEventListener(TOAST_EVENT, listener);

  return () => window.removeEventListener(TOAST_EVENT, listener);
};
