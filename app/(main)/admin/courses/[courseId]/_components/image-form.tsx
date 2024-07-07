"use client";

import { FileUpload } from "@/app/_components/file-upload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Course } from "@/types/course";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import {
  ImageIcon,
  Pencil,
  PlusCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

type Props = {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

type FormData = z.infer<typeof formSchema>;

export const ImageForm = ({
  initialData,
  courseId,
}: Props) => {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const router = useRouter();

  const onSubmit = async (values: FormData) => {
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
    }
  };

  return (
    <div className="mt-6 border shadow-md rounded-md p-4">
      <div className="font-medium flex items-center justify-between mb-4">
        <h3 className="border-b border-sky-500">
          講座サムネイル
        </h3>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>取り消す</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="size-4 mr-2" />
              画像を追加
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="size-4 mr-2" />
              画像を編集
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="size-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
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
          <div className="text-xs text-muted-foreground mt-4">
            16:9の比率が推奨されています
          </div>
        </div>
      )}
    </div>
  );
};
