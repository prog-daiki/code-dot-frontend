import { Chapter } from "@/app/(main)/courses/[courseId]/_components/chapter";
import { CourseInfo } from "@/app/(main)/courses/[courseId]/_components/course-info";
import { Button } from "@/components/ui/button";
import { getCoursePublish } from "@/data/course/get-course-publish";
import MuxPlayer from "@mux/mux-player-react";
import { FaGithub } from "react-icons/fa";

const PlayerPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const data = await getCoursePublish(params.courseId);
  const chapter = data.chapters.find(
    (chapter) => chapter.id === params.chapterId,
  );

  return (
    <div className="py-2 grid lg:grid-cols-3 gap-6 w-full">
      <div className="lg:col-span-2 space-y-4">
        <div className="relative aspect-video">
          <MuxPlayer playbackId={chapter?.muxData?.playbackId!} />
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
        <div className="space-y-4">
          <Button className="w-full flex items-center gap-x-2 py-8 text-md bg-white border text-black hover:bg-gray-100">
            <FaGithub />
            Source Code
          </Button>
        </div>
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

export default PlayerPage;
