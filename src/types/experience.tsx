import { SkillItem } from "./skill";

export enum ExperienceType {
  Work = "work",
  Education = "education",
  Internship = "internship",
  Volunteer = "volunteer",
}

export interface ExperienceItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  start_date: Date;
  end_date: Date | null;
  is_current: boolean;
  type: ExperienceType;
  skill_ids: number[];
  skills: SkillItem[];
  created_at: string;
  updated_at: string;
}
