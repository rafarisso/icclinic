import { type DependencyList, useEffect, useState } from "react";

export interface AsyncResource<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useAsyncResource<T>(loader: () => Promise<T>, deps: DependencyList) {
  const [state, setState] = useState<AsyncResource<T>>({
    data: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    setState((current) => ({ ...current, isLoading: true, error: null }));
    loader()
      .then((data) => {
        if (mounted) {
          setState({ data, isLoading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        if (mounted) {
          const message = error instanceof Error ? error.message : "Erro inesperado";
          setState({ data: null, isLoading: false, error: message });
        }
      });

    return () => {
      mounted = false;
    };
  }, deps);

  return state;
}
