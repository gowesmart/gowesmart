import { z } from "zod";

export const userUpdateRoleSchema = z.object({
  id: z.any(),
  role: z.string().min(1, "Role is required"),
});
