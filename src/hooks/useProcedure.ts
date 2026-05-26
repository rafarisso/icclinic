import { useMemo } from "react";
import { procedureService } from "@/services/procedureService";
import { useAsyncResource } from "@/hooks/useAsyncResource";

export const useProcedure = (id: string | null) => {
  const stableId = id ?? "proc-3";

  return useAsyncResource(
    () => procedureService.getById(stableId).then((procedure) => procedure),
    useMemo(() => [stableId], [stableId])
  );
};
