import { ImageItem } from "./media";

export interface SkillItem {
  id: number;
  title: string;
  level: string;
  order: number;
  user_id: string;
  image_id: number;
  image: ImageItem;
}
