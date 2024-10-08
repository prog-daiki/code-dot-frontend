"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { ConfirmModal } from "@/app/_components/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";

type Props = {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};

export const Actions = ({ disabled, courseId, isPublished }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  const onClick = () => {
    (async () => {
      try {
        setIsLoading(true);
        const token = await getToken();
        if (isPublished) {
          await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/unpublish`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          toast({
            title: "コースを非公開にしました",
          });
        } else {
          await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/publish`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          toast({
            title: "コースを公開しました",
          });
          confetti.onOpen();
        }
        router.refresh();
      } catch (error) {
        toast({
          title: "コースの公開/非公開に失敗しました",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    })().catch((error) => {
      console.error("予期せぬエラー:", error);
      toast({
        variant: "destructive",
        title: "予期せぬエラーが発生しました",
      });
    });
  };

  const onDelete = () => {
    (async () => {
      try {
        setIsLoading(true);
        const token = await getToken();
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast({
          title: "コースを削除しました",
        });
        router.refresh();
        router.push(`/admin/courses`);
      } catch (error) {
        toast({
          title: "コースの削除に失敗しました",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    })().catch((error) => {
      console.error("予期せぬエラー:", error);
      toast({
        variant: "destructive",
        title: "予期せぬエラーが発生しました",
      });
    });
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || isLoading}
        onClick={onClick}
        size="sm"
        variant="outline"
      >
        {isPublished ? "非公開にする" : "公開する"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button disabled={isLoading} size="sm">
          <Trash className="size-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
