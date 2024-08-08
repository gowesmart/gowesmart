import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const bikeCreateSchema = z.object({
  category_id: z.number().min(1, "Category is required"),
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  description: z.string().optional(),
  year: z
    .number()
    .min(1900, "Year must be greater than 1900")
    .max(new Date().getFullYear(), "Year must be less than current year"),
  price: z.number().min(1, "Price is required"),
  stock: z.number().min(0, "Stock is required"),
  image_url: z
    .any()
    .refine((file) => file[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export const bikeUpdateSchema = z.object({
  category_id: z.number().min(1, "Category is required"),
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  description: z.string().optional(),
  year: z
    .number()
    .min(1900, "Year must be greater than 1900")
    .max(new Date().getFullYear(), "Year must be less than current year"),
  price: z.number().min(1, "Price is required"),
  stock: z.number().min(0, "Stock is required"),
  is_available: z.boolean().optional(),
  image_url: z
    .any()
    .refine((file) => {
      if (file.length === 0) return true;
      return file[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((file) => {
      if (file.length === 0) return true;
      return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported.")
    .optional(),
});
