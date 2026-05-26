import { diaryService } from "@/services/diaryService";
import { useAsyncResource } from "@/hooks/useAsyncResource";

export const useDiary = () => useAsyncResource(() => diaryService.getCurrent(), []);
