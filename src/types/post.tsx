import { ImageItem } from "./media";

export interface PostItem {
  id: string;
  title: string;
  content: string;
  status: string;
  user_id: string;
  cover_image: ImageItem;
  created_at: string;
  updated_at: string;
}
