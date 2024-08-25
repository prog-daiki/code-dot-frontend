"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { FileUpload } from "@/app/_components/file-upload";
import { Course } from "@/types/course";

type Props = {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "画像は必須です",
  }),
});

type FormData = z.infer<typeof formSchema>;

export const ImageForm = ({ initialData, courseId }: Props) => {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const router = useRouter();

  const onSubmit = (values: FormData) => {
    (async () => {
      try {
        const token = await getToken();
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/thumbnail`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast({
          title: "講座のサムネイルを更新しました",
        });
        toggleEdit();
        router.refresh();
      } catch {
        toast({
          title: "講座のサムネイルの更新に失敗しました",
          variant: "destructive",
        });
      } finally {
        setIsEditing(false);
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
    <div className="mt-6 rounded-md border p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between font-medium">
        <h3 className="border-b border-sky-500">講座サムネイル</h3>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>取り消す</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="mr-2 size-4" />
              画像を追加
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="mr-2 size-4" />
              画像を編集
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <ImageIcon className="size-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image
              alt="Upload"
              className="rounded-md object-cover"
              fill
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground">
            16:9の比率が推奨です
          </div>
        </div>
      )}
    </div>
  );
};
