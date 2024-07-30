"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import Mux from "@mux/mux-node";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Chapter } from "@/types/chapter";
import { MuxData } from "@/types/mux-data";
import MuxUploader from "@mux/mux-uploader-react";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { FileUpload } from "@/app/_components/file-upload";
import { VideoUpload } from "./video-upload";

type Props = {
  initialChapterData: Chapter;
  initialMuxData: MuxData | null;
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

export const ChapterVideoForm = ({
  initialChapterData,
  initialMuxData,
  courseId,
  chapterId,
}: Props) => {
  console.log(initialMuxData);
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const router = useRouter();

  const onSubmit = async (values: FormData) => {
    try {
      const token = await getToken();
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters/${chapterId}/video`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toggleEdit();
      router.refresh();
    } catch {}
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        動画
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>取り消す</>}
          {!isEditing && !initialChapterData.videoUrl && (
            <>
              <PlusCircle className="size-4 mr-2" />
              動画を追加
            </>
          )}
          {!isEditing && initialChapterData.videoUrl && (
            <>
              <Pencil className="size-4 mr-2" />
              動画を編集する
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialChapterData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="size-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialMuxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            このチャプターの動画をアップロードする
          </div>
        </div>
      )}
      {initialChapterData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          動画は数分で処理されます。動画が表示されない場合は、ページを更新してください。
        </div>
      )}
    </div>
  );
};
