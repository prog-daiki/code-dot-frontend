"use client";

import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, PlusCircle } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";
import { Chapter } from "@/types/chapter";

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
    <div className="relative mt-6 rounded-md border p-4 shadow-md">
      {isUpdating && (
        <div className="absolute right-0 top-0 flex size-full items-center justify-center rounded-md bg-slate-500/20">
          <Loader2 className="size-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        チャプター
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>取り消す</>
          ) : (
            <>
              <PlusCircle className="mr-2 size-4" />
              追加する
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
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
            <Button disabled={!isValid || isSubmitting} type="submit">
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
            items={initialData || []}
            onEdit={onEdit}
            onReorder={onReorder}
          />
        </div>
      )}
      {!isCreating && (
        <p className="mt-4 to-muted-foreground text-xs">
          チャプターの並べ替えが可能です
        </p>
      )}
    </div>
  );
};
