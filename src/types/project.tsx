import { ImageItem } from "./media";
import { SkillItem } from "./skill";

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
  skill_ids: number[];
  skills: SkillItem[];
  user_id: string;
  cover_image_id: number | null;
  cover_image: ImageItem;
  created_at: string;
  updated_at: string;
}
