import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required"),
    passwordConfirmation: z
      .string()
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterType = z.infer<typeof registerSchema>;

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  picture: z.string(),
  role: z.enum(["user", "admin"]),
});

export type User = z.infer<typeof userSchema>;
