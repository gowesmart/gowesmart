import { z } from "zod";

export const reviewCreateSchema = z.object({
  bike_id: z.number(),
  rating: z
    .number()
    .min(1, "Rating must be greater than 1")
    .max(5, "Rating must be less than 5"),
  comment: z.string().min(3, "Comment at least 3 characters"),
  order_id: z.number()
});
