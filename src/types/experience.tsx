import { SkillItem } from "./skill";

export enum WorkExperienceType {
  Work = "work",
  Education = "education",
  Internship = "internship",
  Volunteer = "volunteer",
}

export interface WorkExperienceItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  start_date: Date;
  end_date: Date | null;
  is_current: boolean;
  type: WorkExperienceType;
  skill_ids: number[];
  skills: SkillItem[];
  created_at: string;
  updated_at: string;
}
