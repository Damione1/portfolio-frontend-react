export interface WorkExperiencePost {
  _id: string;
  title: string;
  subTitle: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;

  /** @deprecated */
  company: string;

  /** @deprecated */
  position: string;

  /** @deprecated */
  school: string;

  /** @deprecated */
  grade: string;
}
