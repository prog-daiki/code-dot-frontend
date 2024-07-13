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
    <div className="mt-6 rounded-md border p-4 shadow-md">
      <div className="flex items-center justify-between font-medium">
        <h3 className="border-b border-sky-500">
          講座詳細
        </h3>
        <Button
          className="px-4"
          onClick={toggleEdit}
          variant="ghost"
        >
          {isEditing ? (
            <>取り消す</>
          ) : (
            <>
              <Pencil className="mr-2 size-4" />
              編集する
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="mt-2 text-sm">
          {initialData.description}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
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
              <Button disabled={isSubmitting} type="submit">
                保存する
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
