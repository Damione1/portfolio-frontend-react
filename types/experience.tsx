export interface Post {
  id: string;
  title: string;
  subTitle: string;
  startDate: Date;
  endDate: Date;
  current: boolean;
  description: string;

  /** @deprecated */
  company: string;

  /** @deprecated */
  position: string;

  /** @deprecated */
  school: string;

  /** @deprecated */
  grade: string;
}
