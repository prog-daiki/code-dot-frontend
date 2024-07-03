import { IconBadge } from "@/app/_components/icon-badge";
import { getCourse } from "@/data/course/get-course";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";

const CoursePage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const course = await getCourse(params.courseId);
  if (!course) {
    redirect("/admin/courses");
  }

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
    <div className="flex flex-1 p-4 flex-col">
      <div>
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">講座設定</h1>
          <span className="text-sm text-slate-700">
            入力済みの必須項目 {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">講座のカスタマイズ</h2>
          </div>
          <TitleForm
            initialData={course}
            courseId={params.courseId}
          />
          <DescriptionForm
            initialData={course}
            courseId={params.courseId}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
