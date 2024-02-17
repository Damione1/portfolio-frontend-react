import { z } from "zod";

export const coverImageSchema = z.custom<File | undefined>((file) => {
  if (!file) return true;
  if (!(file instanceof File && file.type.startsWith("image/"))) {
    throw new Error("Please upload a valid image file");
  }
  if (file.size >= 5 * 1024 * 1024) {
    throw new Error("File size should be less than 5MB");
  }
  return true;
});

export const projectSchema = z.object({
  title: z.string().min(1).max(255),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  cover_image_id: z.number().optional(),
  //status: z.enum(["draft", "published", "archived"]),
});

export const uploadImageSchema = z.object({
  image: coverImageSchema,
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type UploadImageInput = z.infer<typeof uploadImageSchema>;
