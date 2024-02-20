import { WorkExperienceType } from "@/types/experience";
import { z } from "zod";

export const experienceSchema = z
  .object({
    title: z.string().min(1).max(255),
    subtitle: z.string().min(1).max(255),
    description: z.string().min(1),
    start_date: z.date(),
    end_date: z.date().optional(),
    is_current: z.boolean(),
    type: z
      .enum(Object.values(WorkExperienceType) as [string, ...string[]])
      .default(WorkExperienceType.Work),
    skill_ids: z.array(z.number()).default([] as number[]),
  })
  .refine(
    (data) =>
      data.is_current === true ||
      (data.is_current === false && data.end_date !== undefined),
    {
      message: "End date is required when is current is false",
      path: ["end_date"],
    }
  );

export type ExperienceInput = z.infer<typeof experienceSchema>;
