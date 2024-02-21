import { z } from "zod";

export const createPostSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: "Title must be greater than 1 characters!" })
      .max(15, { message: "Title must be lower than 15 characters!" }),
    content: z
      .string()
      .min(1, { message: "Content must be greater than 1 characters!" })
      .max(250, { message: "Content must have a lower 250 character" }),
  }),
});

export const updatePostSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    title: z
      .string()
      .min(1, { message: "Title must be greater than 1 characters!" })
      .max(15, { message: "Title must be lower than 15 characters!" }),
    content: z
      .string()
      .min(1, { message: "Content must be greater than 1 characters!" })
      .max(250, { message: "Content must have a lower 250 character" }),
  }).partial(),
});