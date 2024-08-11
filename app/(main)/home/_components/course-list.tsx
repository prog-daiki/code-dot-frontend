import { PublishCourseWithChapterWithCategory } from "@/data/course/get-courses-publish";
import { CourseCard } from "./course-card";

export const CoursesList = ({
  items,
}: {
  items: PublishCourseWithChapterWithCategory[];
}) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.course.id}
            id={item.course.id}
            title={item.course.title}
            imageUrl={item.course.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.course.price!}
            category={item.category.name}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          講座が見つかりませんでした
        </div>
      )}
    </div>
  );
};
