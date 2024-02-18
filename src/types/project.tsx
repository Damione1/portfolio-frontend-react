import { ImageItem } from "./media";

export enum ProjectStatus {
  Draft = "draft",
  Published = "published",
  Archived = "archived",
}
export interface ProjectItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  status: ProjectStatus;
  user_id: string;
  cover_image: ImageItem;
  cover_image_id: number | null;
  created_at: string;
  updated_at: string;
}
