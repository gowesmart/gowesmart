import { z } from "zod";

export const categoryCreateSchema = z.object({
  id: z.any().optional(),
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
});

export const categoryUpdateSchema = categoryCreateSchema;
