export type Course = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  sourceUrl?: string;
  publishFlag?: boolean;
  categoryId?: string;
  createDate: Date;
  updateDate: Date;
};
