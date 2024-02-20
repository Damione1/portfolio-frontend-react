import { ImageItem } from "./media";

export enum SkillLevel {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
  Expert = "expert",
  Master = "master",
}

export interface SkillItem {
  id: number;
  title: string;
  level: SkillLevel;
  order: number;
  user_id: string;
  image_id: number;
  image: ImageItem;
}
