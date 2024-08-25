"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { ConfirmModal } from "@/app/_components/confirm-modal";

type Props = {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
};

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: Props) => {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      if (isPublished) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters/${chapterId}/unpublish`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast({
          title: "チャプターを非公開にしました",
        });
      } else {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters/${chapterId}/publish`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast({
          title: "チャプターを公開しました",
        });
      }
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "チャプターを非公開にしました",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters/${chapterId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast({
        title: "チャプターを削除しました",
      });
      router.refresh();
      router.push(`/admin/courses/${courseId}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "チャプターの削除に失敗しました",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button
          disabled={disabled || isLoading}
          onClick={onClick}
          size="sm"
          variant="outline"
        >
          {isPublished ? "UnPublish" : "Publish"}
        </Button>
        <ConfirmModal onConfirm={onDelete}>
          <Button disabled={isLoading} size="sm">
            <Trash className="size-4" />
          </Button>
        </ConfirmModal>
      </div>
    </>
  );
};
