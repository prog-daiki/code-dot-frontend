"use client";

import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";
import { Chapter } from "@/types/chapter";

type Props = {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  freeFlag: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

export const ChapterAccessForm = ({
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
    defaultValues: {
      freeFlag: !!initialData.freeFlag,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: FormData) => {
    try {
      const token = await getToken();
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters/${chapterId}/access`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast({
        title: "チャプターのアクセス権限を更新しました",
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "チャプターのアクセス権限の更新に失敗しました",
      });
    }
  };

  return (
    <div className="mt-6 rounded-md border p-4 shadow-sm">
      <div className="flex items-center justify-between font-medium">
        アクセス権限
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>取り消す</>
          ) : (
            <>
              <Pencil className="mr-2 size-4" />
              編集
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.freeFlag && "text-slate-500",
          )}
        >
          {initialData.freeFlag
            ? "このチャプターは全てのユーザーが閲覧可能です"
            : "このチャプターは購入者以外閲覧できません"}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="freeFlag"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      このチャプターを全てのユーザーが閲覧可能にする
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                保存
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
