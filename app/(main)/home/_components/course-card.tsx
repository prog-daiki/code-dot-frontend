import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { IconBadge } from "@/app/_components/icon-badge";
import { formatPrice } from "@/lib/format-price";

interface Props {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  category: string;
  purchased: boolean;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  category,
  purchased,
}: Props) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image
            alt={title}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="line-clamp-2 text-lg font-medium transition group-hover:text-sky-700 md:text-base">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge icon={BookOpen} size="sm" />
              <span>
                {chaptersLength} {chaptersLength > 1 ? "chapters" : "chapter"}
              </span>
            </div>
          </div>
          <p className="text-md font-medium text-slate-700 md:text-sm">
            {purchased ? "購入済み" : formatPrice(price)}
          </p>
        </div>
      </div>
    </Link>
  );
};
