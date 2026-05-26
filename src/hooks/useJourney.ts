import { journeyService } from "@/services/journeyService";
import { useAsyncResource } from "@/hooks/useAsyncResource";

export const useJourney = () => useAsyncResource(() => journeyService.getCurrent(), []);
