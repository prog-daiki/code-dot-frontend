export type Course = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  userId: string;
  publishFlag?: boolean;
  deleteFlag?: boolean;
  categoryId?: string;
  createDate: Date;
  updateDate: Date;
};
