"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Chapter } from "@/types/chapter";
import { Course } from "@/types/course";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChaptersList } from "./chapter-list";

type Props = {
  initialData: Chapter[];
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

export const ChaptersForm = ({ initialData, courseId }: Props) => {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((prev) => !prev);
  };

  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: FormData) => {
    try {
      const token = await getToken();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast({
        title: "チャプターを登録しました",
      });
      form.reset();
      toggleCreating();
      router.refresh();
    } catch {
      toast({
        variant: "destructive",
        title: "チャプターの登録に失敗しました",
      });
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      const token = await getToken();
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters/reorder`,
        {
          list: updateData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast({
        title: "チャプターを登録しました",
      });
      router.refresh();
    } catch {
      toast({
        variant: "destructive",
        title: "チャプターの登録に失敗しました",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/admin/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="relative mt-6 border shadow-md rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="size-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        チャプター
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>取り消す</>
          ) : (
            <>
              <PlusCircle className="size-4 mr-2" />
              追加する
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="useStateとは"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
              登録
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.length && "text-slate-500",
          )}
        >
          {!initialData.length && "チャプターが未登録です"}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs to-muted-foreground mt-4">
          チャプターの並べ替えが可能です
        </p>
      )}
    </div>
  );
};
