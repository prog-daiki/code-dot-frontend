"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Chapter } from "@/types/chapter";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  description: z
    .string()
    .min(1, {
      message: "タイトルは必須です",
    })
    .max(1000, {
      message: "タイトルは100文字以内です",
    }),
});

type FormData = z.infer<typeof formSchema>;

export const ChapterDescriptionForm = ({
  initialData,
  courseId,
  chapterId,
}: Props) => {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: FormData) => {
    try {
      const token = await getToken();
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters/${chapterId}/description`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast({
        title: "チャプターの詳細を更新しました",
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        variant: "destructive",
        title: "チャプターの詳細の更新に失敗しました",
      });
    }
  };

  return (
    <div className="mt-6 border shadow-sm rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <h3 className="border-b border-sky-500">詳細</h3>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>取り消す</>
          ) : (
            <>
              <Pencil className="size-4 mr-2" />
              編集
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.description}</p>}
      {!isEditing && !initialData.description && (
        <p className="text-sm mt-2 text-muted-foreground">詳細が未設定です</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="チャプターの紹介"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                保存
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};