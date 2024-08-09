import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";

import { IconBadge } from "@/app/_components/icon-badge";
import { getCategories } from "@/data/category/get-categories";
import { getCourse } from "@/data/course/get-course";

import { CategoryForm } from "./_components/category-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { TitleForm } from "./_components/title-form";
import { PriceForm } from "./_components/price-form";
import { ChaptersForm } from "./_components/chapter-form";
import { getChapters } from "@/data/chapter/get-chapters";
import { Actions } from "./_components/actions";
import { Banner } from "@/app/_components/banner";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const course = await getCourse(params.courseId);
  if (!course) {
    redirect("/admin/courses");
  }
  const chapters = await getChapters(params.courseId);
  const categories = await getCategories();

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="space-y-4">
        {!course.publishFlag && <Banner label="この講座は非公開です" />}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">講座設定</h1>
            <span className="text-sm text-slate-700">
              入力済みの必須項目 {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.publishFlag!}
          />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">講座のカスタマイズ</h2>
            </div>
            <TitleForm courseId={params.courseId} initialData={course} />
            <DescriptionForm courseId={params.courseId} initialData={course} />
            <ImageForm courseId={params.courseId} initialData={course} />
            <CategoryForm
              courseId={params.courseId}
              initialData={course}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
            <PriceForm initialData={course} courseId={course.id} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">チャプター</h2>
              </div>
              <ChaptersForm initialData={chapters} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
