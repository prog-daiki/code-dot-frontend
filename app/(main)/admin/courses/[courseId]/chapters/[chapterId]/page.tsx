import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Banner } from "@/app/_components/banner";
import { IconBadge } from "@/app/_components/icon-badge";
import { getChapter } from "@/data/chapter/get-chapter";

import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterActions } from "./_components/chapter-actions";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { ChapterDescriptionForm } from "./_components/description-form";
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
  const data = await getChapter(params.courseId, params.chapterId);
  const chapter = data.chapter;
  const muxData = data.mux_data;
  if (!chapter) {
    return redirect("/admin/courses");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="space-y-4">
      {!chapter.publishFlag && (
        <Banner label="このチャプターは非公開です" variant="warning" />
      )}
      <div>
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              className="mb-6 flex items-center text-sm transition hover:opacity-75"
              href={`/admin/courses/${params.courseId}`}
            >
              <ArrowLeft className="mr-2 size-4" />
              講座設定
            </Link>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">チャプター設定</h1>
                <span className="text-sm text-slate-700">
                  全てのフィールドを入力してください {completionText}
                </span>
              </div>
              <ChapterActions
                chapterId={params.chapterId}
                courseId={params.courseId}
                disabled={!isComplete}
                isPublished={chapter.publishFlag}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">チャプターのカスタマイズ</h2>
              </div>
              <ChapterTitleForm
                chapterId={params.chapterId}
                courseId={params.courseId}
                initialData={chapter}
              />
              <ChapterDescriptionForm
                chapterId={params.chapterId}
                courseId={params.courseId}
                initialData={chapter}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">アクセス設定</h2>
              </div>
              <ChapterAccessForm
                chapterId={params.chapterId}
                courseId={params.courseId}
                initialData={chapter}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">動画を追加</h2>
            </div>
            <ChapterVideoForm
              chapterId={params.chapterId}
              courseId={params.courseId}
              initialChapterData={chapter}
              initialMuxData={muxData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
