import { getCategories } from "@/data/category/get-categories";
import { Categories } from "./_components/categories";
import { SearchInput } from "./_components/search-input";
import { getCoursesPublish } from "@/data/course/get-courses-publish";
import { CoursesList } from "./_components/course-list";

type Props = {
  searchParams: {
    title: string;
    categoryId: string;
  };
};

export default async function DashboardPage({ searchParams }: Props) {
  const categories = await getCategories();
  const courses = await getCoursesPublish(
    searchParams.title,
    searchParams.categoryId,
  );

  return (
    <div>
      <div className="mb-4">
        <SearchInput />
      </div>
      <div className="space-y-2">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </div>
  );
}
