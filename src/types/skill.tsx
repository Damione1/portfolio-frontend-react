import { ImageItem } from "./media";

export interface SkillItem {
  id: string;
  title: string;
  image_id: string;
  level: string;
  order: number;
  user_id: string;
  image: ImageItem;
}
