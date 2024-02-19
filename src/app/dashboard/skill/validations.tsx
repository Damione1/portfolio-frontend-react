import { z } from "zod";

export const skillSchema = z.object({
  title: z.string().min(1).max(255),
  image_id: z.number(),
});

export type SkillInput = z.infer<typeof skillSchema>;
