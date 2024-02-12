import { ImageItem } from "./media";

export interface ProjectItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  status: string;
  user_id: string;
  cover_image: ImageItem;
  cover_image_id: number;
  created_at: string;
  updated_at: string;
}
