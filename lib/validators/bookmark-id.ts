import { z } from "zod";

export const bookmarkIdSchema = z.object({
  id: z.uuid("Invalid bookmark id"),
});

export type BookmarkIdParams = z.infer<typeof bookmarkIdSchema>;
