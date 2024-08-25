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
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";
import { Course } from "@/types/course";

type Props = {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
};

const formSchema = z.object({
  categoryId: z.string().min(1, {
    message: "カテゴリーは必須です",
  }),
});

type FormData = z.infer<typeof formSchema>;

export const CategoryForm = ({ initialData, courseId, options }: Props) => {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (values: FormData) => {
    (async () => {
      try {
        const token = await getToken();
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/category`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast({
          title: "カテゴリーを更新しました",
        });
        toggleEdit();
        router.refresh();
      } catch {
        toast({
          variant: "destructive",
          title: "カテゴリーの更新に失敗しました",
        });
      }
    })().catch((error) => {
      console.error("予期せぬエラー:", error);
      toast({
        variant: "destructive",
        title: "予期せぬエラーが発生しました",
      });
    });
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId,
  );

  return (
    <div className="mt-6 rounded-md border p-4 shadow-md">
      <div className="flex items-center justify-between font-medium">
        <h3 className="border-b border-sky-500">カテゴリー</h3>
        <Button onClick={toggleEdit} variant="ghost">
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
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.categoryId && "text-slate-500",
          )}
        >
          {selectedOption?.label || "カテゴリーが未登録です"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(form.getValues());
            }}
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={isSubmitting || !isValid} type="submit">
                保存する
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
