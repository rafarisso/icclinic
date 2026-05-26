import { userService } from "@/services/userService";
import { useAsyncResource } from "@/hooks/useAsyncResource";

export const useUser = () => useAsyncResource(() => userService.getCurrent(), []);
