import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must have at least 2 characters"),
    surname: z.string().min(2, "Surname must have at least 2 characters"),
    email: z.string().email("Email invalid"),
    password: z.string().min(6, "Password must have at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });
