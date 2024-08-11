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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { Course } from "@/types/course";
import { formatPrice } from "@/lib/format-price";

type Props = {
  initialData: Course;
  courseId: string;
};

const formSchema = z.object({
  price: z.coerce
    .number()
    .min(1, {
      message: "価格は必須です",
    })
    .max(1000000, {
      message: "価格は100万円以内です",
    }),
});

type FormData = z.infer<typeof formSchema>;

export const PriceForm = ({ initialData, courseId }: Props) => {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FormData) => {
    try {
      const token = await getToken();
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/price`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast({
        title: "講座の価格を更新しました",
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        variant: "destructive",
        title: "講座の価格の更新に失敗しました",
      });
    }
  };

  return (
    <div className="mt-6 rounded-md border p-4 shadow-md">
      <div className="flex items-center justify-between font-medium">
        <h3 className="border-b border-sky-500">価格</h3>
        <Button className="px-4" onClick={toggleEdit} variant="ghost">
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
          className={`mt-2 ${initialData.price ? "text-sm" : "text-xs text-muted-foreground"}`}
        >
          {initialData.price
            ? formatPrice(initialData.price)
            : "価格が未設定です"}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      disabled={isSubmitting}
                      placeholder="1000"
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
