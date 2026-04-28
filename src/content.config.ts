import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      url: z.url(),
      github: z
        .union([z.url(), z.literal("")])
        .optional()
        .transform((value) => value || undefined),
      ogp: z.url().optional(),
      thumbnail: z
        .string()
        .regex(/^[^/\\]+$/, "thumbnail must be a file name in src/images/")
        .optional(),
      requiresBasicAuth: z.boolean().default(false),
      order: z.number().int().nonnegative(),
    }),
});

export const collections = {
  projects,
};
