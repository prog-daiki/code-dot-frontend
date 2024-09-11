import { PublishCourseWithChapterWithCategory } from "@/data/course/get-courses-publish";

import { CourseCard } from "./course-card";

export const CoursesList = ({
  items,
}: {
  items: PublishCourseWithChapterWithCategory[];
}) => {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {items.map((item) => (
          <CourseCard
            category={item.category.name}
            chaptersLength={item.chapters.length}
            id={item.course.id}
            imageUrl={item.course.imageUrl!}
            key={item.course.id}
            price={item.course.price!}
            title={item.course.title}
            purchased={item.purchased}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground">
          講座が見つかりませんでした
        </div>
      )}
    </div>
  );
};
