import { z } from "zod";

export const EditUserProfileFormSchema = z.object({
  email: z.string().email("Required email"),

  name: z.string().min(1, "name is required"),
});
