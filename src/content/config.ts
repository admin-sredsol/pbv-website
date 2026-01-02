import { defineCollection, z } from "astro:content";

const team = defineCollection({
  schema: z.object({
    name: z.string(),
    jobTitle: z.string(),
    headshot: z.string().optional(),
    order: z.number().optional(),
    publish: z.boolean().optional(),
    bio: z.string().optional(),
  }),
});

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { team, blog };
