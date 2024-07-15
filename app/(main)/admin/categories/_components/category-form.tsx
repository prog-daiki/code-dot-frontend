"use client";

import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "カテゴリー名は必須です",
    })
    .max(100, {
      message: "タイトルは100文字以内で入力してください",
    }),
});

export const CategoryForm = ({ setIsOpen }: Props) => {
  const { getToken } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    (async () => {
      try {
        const token = await getToken();
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        router.refresh();
        toast({
          title: "カテゴリーを作成しました",
        });
        setIsOpen(false);
      } catch (error) {
        console.error("エラー:", error);
        toast({
          variant: "destructive",
          title: "カテゴリーの作成に失敗しました",
        });
        setIsOpen(false);
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
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form.getValues());
        }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                カテゴリー名
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Javascript"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-2">
          <Link href="/">
            <Button type="button" variant="ghost">
              キャンセル
            </Button>
          </Link>
          <Button disabled={isSubmitting} type="submit">
            作成する
          </Button>
        </div>
      </form>
    </Form>
  );
};
