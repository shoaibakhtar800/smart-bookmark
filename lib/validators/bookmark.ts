import { z } from "zod";

export const createBookmarkSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  url: z.url("Invalid URL").max(500, "URL too long"),
});

export type CreateBookmarkInput = z.infer<typeof createBookmarkSchema>;
