"use client";

import { Category } from "@/types/category";

import { CategoryItem } from "./category-item";

type Props = {
  items: Category[];
};

export const Categories = ({ items }: Props) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem key={item.id} label={item.name} value={item.id} />
      ))}
    </div>
  );
};
