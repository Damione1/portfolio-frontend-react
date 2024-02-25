import { ImageItem } from "./media";

export enum PostStatus {
  Draft = "draft",
  Published = "published",
  Archived = "archived",
}
export interface PostItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  status: PostStatus;
  user_id: string;
  cover_image_id: number | null;
  cover_image: ImageItem;
  created_at: string;
  updated_at: string;
}
