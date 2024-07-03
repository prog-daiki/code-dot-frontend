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
import { Course } from "@/types/course";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  description: z
    .string()
    .min(1, {
      message: "詳細文は必須です。",
    })
    .max(1000, {
      message: "詳細文は1000文字以内で入力してください。",
    }),
});

type FormData = z.infer<typeof formSchema>;

export const DescriptionForm = ({
  initialData,
  courseId,
}: Props) => {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FormData) => {
    try {
      const token = await getToken();
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/description`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast({
        title: "講座詳細を更新しました",
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        title: "エラーが発生しました",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6 border shadow-md rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <h3 className="border-b border-sky-500">
          講座詳細
        </h3>
        <Button
          onClick={toggleEdit}
          variant="ghost"
          className="px-4"
        >
          {isEditing ? (
            <>取り消す</>
          ) : (
            <>
              <Pencil className="size-4 mr-2" />
              編集する
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData.description}
        </p>
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
                      placeholder="Javascriptの非同期処理をマスターしよう！"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={isSubmitting}>
                保存する
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
