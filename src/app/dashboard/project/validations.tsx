import { z } from "zod";

export const coverImageSchema = z
  .custom<File | undefined>()
  .refine((file) => {
    !file || (file instanceof File && file.type.startsWith("image/"));
  }, "Please upload a valid image file")
  .refine((file) => {
    !file || file.size < 5 * 1024 * 1024;
  }, "File size should be less than 5MB");

export const projectSchema = z.object({
  title: z.string().min(1).max(255),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  //status: z.enum(["draft", "published", "archived"]),
});

export const uploadImageSchema = z.object({
  image: coverImageSchema,
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type UploadImageInput = z.infer<typeof uploadImageSchema>;
