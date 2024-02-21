import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    full_name: z
      .string()
      .min(1, { message: "Full Name must be greater than 1 characters!" })
      .max(100, { message: "Full Name must be lower than 15 characters!" }),
    age: z
      .number()
      .int(),
    email: z
      .string()
      .email(),
    password: z.string(),
    confirm: z.string(),
  }).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  }),
});

export const updateUserSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    full_name: z
      .string()
      .min(1, { message: "Full Name must be greater than 1 characters!" })
      .max(100, { message: "Full Name must be lower than 15 characters!" }),
    age: z
      .number()
      .int(),
    email: z
      .string()
      .email(),
    password: z.string(),
    confirm: z.string(),
  })
  .partial()
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  }),
});