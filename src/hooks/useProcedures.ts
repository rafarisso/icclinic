import { procedureService } from "@/services/procedureService";
import { useAsyncResource } from "@/hooks/useAsyncResource";

export const useProcedures = () => useAsyncResource(() => procedureService.getAll(), []);

export const useFeaturedProcedures = () =>
  useAsyncResource(() => procedureService.getFeatured(), []);
