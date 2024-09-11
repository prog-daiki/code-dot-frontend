"use client";

import { IconBadge } from "@/app/_components/icon-badge";
import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type ChapterProps = {
  purchased: boolean;
  chapterTitle: string;
  chapterDescription?: string;
  courseId: string;
  chapterId: string;
};

export const Chapter = ({
  purchased,
  chapterTitle,
  chapterDescription,
  courseId,
  chapterId,
}: ChapterProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/player/courses/${courseId}/chapters/${chapterId}`);
  };
  return (
    <button
      onClick={handleClick}
      className={cn(
        "text-lg border p-4 w-full",
        purchased ? "" : "bg-gray-100",
      )}
      disabled={!purchased}
    >
      <div className="flex gap-x-4 items-center">
        <IconBadge icon={PlayCircle} size="md" />
        <div className=" text-left">
          <p className="font-semibold">{chapterTitle}</p>
          <p className="text-muted-foreground text-sm">{chapterDescription}</p>
        </div>
      </div>
    </button>
  );
};
