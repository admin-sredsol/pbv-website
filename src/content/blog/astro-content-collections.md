---
title: "Astro Content Collections: A Practical Guide"
pubDate: 2024-06-05
description: "Learn how to use Astro Content Collections to power dynamic, content-driven sites with Markdown and TypeScript."
author: "Bob Smith"
cover: "/images/blog/astro-content-collections.jpg"
tags: ["astro", "content", "guide"]
draft: false
---
Astro Content Collections are a powerful feature that let you organize and validate your content using TypeScript schemas. They make it easy to build blogs, documentation, and other content-driven sites with confidence.

## Why Use Content Collections?

- **Type safety:** Define schemas for your content and catch errors at build time.
- **Organization:** Keep your Markdown or MDX files in structured folders.
- **Dynamic routing:** Easily generate pages for each content entry.

## Getting Started

1. **Define your collection in `src/content/config.ts`:**

    ```ts
    import { defineCollection, z } from "astro:content";

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

    export const collections = { blog };
    ```

2. **Add Markdown files to your collection folder:**

    ```
    src/content/blog/my-first-post.md
    ```

3. **Query your collection in Astro pages:**

    ```js
    import { getCollection } from "astro:content";
    const posts = await getCollection("blog");
    ```

## Tips

- Use the `draft` field to hide posts from production.
- Add custom fields (like `category` or `readingTime`) to your schema as needed.
- Combine with Astro’s dynamic routes for powerful, content-driven pages.

Content Collections are a game-changer for Astro projects. Try them out in your next site!