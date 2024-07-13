import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";

import { IconBadge } from "@/app/_components/icon-badge";
import { getCategories } from "@/data/category/get-categories";
import { getCourse } from "@/data/course/get-course";

import { CategoryForm } from "./_components/category-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { TitleForm } from "./_components/title-form";


const CoursePage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const course = await getCourse(params.courseId);
  if (!course) {
    redirect("/admin/courses");
  }
  const categories = await getCategories();

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields =
    requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="flex flex-1 flex-col p-4">
      <div>
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">講座設定</h1>
          <span className="text-sm text-slate-700">
            入力済みの必須項目 {completionText}
          </span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">講座のカスタマイズ</h2>
          </div>
          <TitleForm
            courseId={params.courseId}
            initialData={course}
          />
          <DescriptionForm
            courseId={params.courseId}
            initialData={course}
          />
          <ImageForm
            courseId={params.courseId}
            initialData={course}
          />
          <CategoryForm
            courseId={params.courseId}
            initialData={course}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
