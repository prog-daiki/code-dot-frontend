import { IconBadge } from "@/app/_components/icon-badge";
import { getChapter } from "@/data/chapter/get-chapter";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChapterTitleForm } from "./_components/title-form";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  // チャプターを取得する
  const chapter = await getChapter(params.courseId, params.chapterId);
  if (!chapter) {
    return redirect("/admin/courses");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/admin/courses/${params.courseId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="size-4 mr-2" />
            講座設定
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">チャプター設定</h1>
              <span className="text-sm text-slate-700">
                全てのフィールドを入力してください {completionText}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">チャプターのカスタマイズ</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
        <div>テスト</div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
