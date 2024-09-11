import { IconBadge } from "@/app/_components/icon-badge";
import { getCoursePublish } from "@/data/course/get-course-publish";
import MuxPlayer from "@mux/mux-player-react";
import { PlayCircle } from "lucide-react";
import { CourseInfo } from "./_components/course-info";
import { PurchaseButton } from "./_components/purchase-button";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Chapter } from "./_components/chapter";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const data = await getCoursePublish(params.courseId);

  return (
    <div className="py-2 grid lg:grid-cols-3 gap-6 w-full">
      <div className="lg:col-span-2 space-y-4">
        <div className="relative aspect-video">
          <MuxPlayer playbackId={data.chapters[0]?.muxData?.playbackId!} />
        </div>
        <CourseInfo
          categoryName={data.category.name}
          title={data.course.title}
          description={data.course.description}
          price={data.course.price!}
          chaptersLength={data.chapters.length}
          updateDate={data.course.updateDate}
          createDate={data.course.createDate}
          purchased={data.purchased}
        />
      </div>
      <div className="lg:col-span-1 space-y-4">
        {data.purchased ? (
          <div className="space-y-4">
            <Button className="bg-sky-700 text-white font-semibold text-md w-full py-8 hover:bg-sky-900">
              学習を開始する
            </Button>
            <Button className="w-full flex items-center gap-x-2 py-8 text-md bg-white border text-black hover:bg-gray-100">
              <FaGithub />
              Source Code
            </Button>
          </div>
        ) : (
          <PurchaseButton courseId={params.courseId} />
        )}
        <div className="shadow-sm">
          <div className="bg-gray-900 text-white p-4 rounded-t-md">
            <h3 className="text-xl font-bold">Chapter</h3>
          </div>
          <ul>
            {data.chapters.map((chapter) => (
              <Chapter
                key={chapter.id}
                purchased={data.purchased}
                chapterTitle={chapter.title}
                chapterDescription={chapter.description}
                courseId={params.courseId}
                chapterId={chapter.id}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
