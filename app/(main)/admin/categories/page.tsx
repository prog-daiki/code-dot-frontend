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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useState } from "react";

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

const CategoriesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
  ) => {
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
    } catch {
      toast({
        variant: "destructive",
        title: "カテゴリーの作成に失敗しました",
      });
      setIsOpen(false);
    }
  };

  return (
    <div className="container flex flex-1 py-6">
      <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="rounded-md bg-black px-4 py-2 text-white">
            カテゴリーを作成
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="space-y-6">
              <DialogTitle className="font-normal text-gray-500">
                新しいカテゴリーを作成しよう
              </DialogTitle>
              <DialogDescription>
                カテゴリーの名前は後で変更できます。気軽に決めましょう。
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
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
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                  >
                    作成する
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CategoriesPage;
