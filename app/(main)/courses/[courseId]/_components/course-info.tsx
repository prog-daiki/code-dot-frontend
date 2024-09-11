import { IconBadge } from "@/app/_components/icon-badge";
import { formatPrice } from "@/lib/format-price";
import { BookOpen } from "lucide-react";

interface CourseInfoProps {
  categoryName: string;
  title: string;
  description?: string;
  price: number;
  chaptersLength: number;
  updateDate: Date;
  createDate: Date;
  purchased: boolean;
}

export const CourseInfo = ({
  categoryName,
  title,
  description,
  price,
  chaptersLength,
  updateDate,
  createDate,
  purchased,
}: CourseInfoProps) => {
  return (
    <div className="space-y-4 border rounded-md shadow-sm p-4">
      <p className="text-md text-muted-foreground">{categoryName}</p>
      <h2 className="text-lg lg:text-2xl font-bold">{title}</h2>
      <p>{description}</p>
      <div className="flex items-center gap-x-2">
        <p className="text-sky-900 text-md lg:text-xl font-bold">
          {purchased ? "購入済み" : formatPrice(price)}
        </p>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1 text-slate-500">
            <IconBadge icon={BookOpen} size="sm" />
            <span>
              {chaptersLength} {chaptersLength > 1 ? "chapters" : "chapter"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 text-xs lg:text-sm">
        <p className="text-muted-foreground">
          更新日時：{new Date(updateDate).toLocaleDateString()}
        </p>
        <p className="text-muted-foreground">
          作成日時：{new Date(createDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
