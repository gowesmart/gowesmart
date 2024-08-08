import { z } from "zod";

export const bikeCreateSchema = z.object({
  category_id: z.number().min(1, "Category is required"),
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  description: z.string().optional(),
  year: z
    .number()
    .min(1900, "Year is required")
    .max(new Date().getFullYear(), "Invalid year"),
  price: z.number().min(1, "Price is required"),
  stock: z.number().min(0, "Stock is required"),
  is_available: z.boolean().optional(),
});
