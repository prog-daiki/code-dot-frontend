"use client";

import { useAuth } from "@clerk/nextjs";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { FileUpload } from "@/app/_components/file-upload";
import { Chapter } from "@/types/chapter";
import { MuxData } from "@/types/mux-data";

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
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        動画
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>取り消す</>}
          {!isEditing && !initialChapterData.videoUrl && (
            <>
              <PlusCircle className="mr-2 size-4" />
              動画を追加
            </>
          )}
          {!isEditing && initialChapterData.videoUrl && (
            <>
              <Pencil className="mr-2 size-4" />
              動画を編集する
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialChapterData.videoUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <Video className="size-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
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
          <div className="mt-4 text-xs text-muted-foreground">
            このチャプターの動画をアップロードする
          </div>
        </div>
      )}
      {initialChapterData.videoUrl && !isEditing && (
        <div className="mt-2 text-xs text-muted-foreground">
          動画は数分で処理されます。動画が表示されない場合は、ページを更新してください。
        </div>
      )}
    </div>
  );
};
