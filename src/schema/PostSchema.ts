import { z } from "zod";

export const createPostSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: "Title must be greater than 1 characters!" })
      .max(100, { message: "Title must be lower than 100 characters!" }),
    content: z
      .string()
      .min(1, { message: "Content must be greater than 1 characters!" })
      .max(255, { message: "Content must have a lower 255 character" }),
  }),
});

export const updatePostSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    title: z
      .string()
      .min(1, { message: "Title must be greater than 1 characters!" })
      .max(100, { message: "Title must be lower than 100 characters!" }),
    content: z
      .string()
      .min(1, { message: "Content must be greater than 1 characters!" })
      .max(255, { message: "Content must have a lower 255 character" }),
  }).partial(),
});