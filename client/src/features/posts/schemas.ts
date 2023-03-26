import { z } from "zod";

export const categoriesSchema = z.object({
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      created_at: z.string().optional(),
      updated_at: z.string().optional(),
    })
  ),
});
export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type Category = z.infer<typeof categoriesSchema>["data"][number];

export const postsSchema = z.object({
  message: z.string(),
  pagination: z.object({
    next_cursor: z.string().nullable(),
    prev_cursor: z.string().nullable(),
    count: z.number(),
  }),
  data: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      title: z.string(),
      body: z.string(),
      views: z.number(),
      likes: z.number(),
      thumbnail: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      category: categorySchema,
    })
  ),
});

export type Post = z.infer<typeof postsSchema>["data"][number];
