import { IconBadge } from "@/app/_components/icon-badge";
import { Button } from "@/components/ui/button";
import { getCoursePublish } from "@/data/course/get-course-publish";
import { formatPrice } from "@/lib/format-price";
import MuxPlayer from "@mux/mux-player-react";
import { BookOpen, PlayCircle } from "lucide-react";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const data = await getCoursePublish(params.courseId);

  return (
    <div className="py-2 grid lg:grid-cols-3 gap-6 w-full">
      <div className="lg:col-span-2 space-y-4">
        <div className="relative aspect-video">
          <MuxPlayer playbackId={data.chapters[0]?.muxData?.playbackId!} />
        </div>
        <div className="space-y-4 border rounded-md shadow-sm p-4">
          <p className="text-md text-muted-foreground">{data.category.name}</p>
          <h2 className="text-lg lg:text-2xl font-bold">{data.course.title}</h2>
          <p>{data.course.description}</p>
          <div className="flex items-center gap-x-2">
            <p className="text-sky-900 text-md lg:text-xl font-bold">
              {formatPrice(data.course.price!)}
            </p>
            <div className="flex items-center gap-x-2">
              <div className="flex items-center gap-x-1 text-slate-500">
                <IconBadge icon={BookOpen} size="sm" />
                <span>{data.chapters.length} チャプター</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 text-xs lg:text-sm">
            <p className="text-muted-foreground">
              更新日時：{new Date(data.course.updateDate).toLocaleDateString()}
            </p>
            <p className="text-muted-foreground">
              作成日時：{new Date(data.course.createDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 space-y-4">
        <button className="w-full bg-gradient-to-r from-sky-900 to-indigo-800 text-white font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl shadow-lg text-xl relative overflow-hidden group">
          <span className="relative z-10">講座を購入する</span>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></span>
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            →
          </span>
        </button>
        <div className="shadow-sm">
          <div className="bg-gray-900 text-white p-4 rounded-t-md">
            <h3 className="text-xl font-bold">コンテンツ</h3>
          </div>
          <ul>
            {data.chapters.map((chapter) => (
              <div key={chapter.id} className="text-lg border p-4">
                <div className="flex gap-x-4 items-center">
                  <IconBadge icon={PlayCircle} size="md" />
                  <div>
                    <p className="font-semibold">{chapter.title}</p>
                    <p className="text-muted-foreground text-sm">
                      {chapter.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
