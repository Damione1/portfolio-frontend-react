import { PostStatus } from "@/types/post";
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

export const postSchema = z.object({
  title: z.string().min(1).max(255),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  cover_image_id: z.number(),
  status: z
    .enum(Object.values(PostStatus) as [string, ...string[]])
    .default(PostStatus.Draft),
});

export const uploadImageSchema = z.object({
  image: coverImageSchema,
});

export type postInput = z.infer<typeof postSchema>;
export type UploadImageInput = z.infer<typeof uploadImageSchema>;
