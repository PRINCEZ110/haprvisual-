import { z } from "zod";
import {
  BUDGET_OPTIONS,
  DEADLINE_OPTIONS,
  SERVICE_OPTIONS,
} from "@/lib/constants";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Invalid email").max(200),
  service: z.enum(SERVICE_OPTIONS),
  budget: z.enum(BUDGET_OPTIONS),
  deadline: z.enum(DEADLINE_OPTIONS),
  message: z.string().trim().max(5000).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const projectSchema = z.object({
  title: z.string().trim().min(1).max(200),
  year: z.string().trim().min(1).max(20),
  description: z.string().trim().min(1).max(1000),
  coverImage: z.string().trim().url().max(2000),
  categories: z.array(z.string().trim().min(1)).max(20),
  gallery: z.array(z.string().trim().url().max(2000)).max(20).default([]),
});

export type ProjectInput = z.infer<typeof projectSchema>;