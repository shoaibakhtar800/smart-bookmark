import { z } from "zod";

export const bookmarkIdSchema = z.object({
  id: z.uuid("Bookmark id is required"),
});

export type BookmarkIdParams = z.infer<typeof bookmarkIdSchema>;
