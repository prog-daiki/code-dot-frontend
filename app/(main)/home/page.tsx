import { getCategories } from "@/data/category/get-categories";
import { getCoursesPublish } from "@/data/course/get-courses-publish";

import { Categories } from "./_components/categories";
import { CoursesList } from "./_components/course-list";
import { SearchInput } from "./_components/search-input";

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
