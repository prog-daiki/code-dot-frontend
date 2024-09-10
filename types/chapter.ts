export type Chapter = {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  position: number;
  publishFlag: boolean;
  courseId: string;
  createdDate: Date;
  updatedDate: Date;
};
