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

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "タイトルは必須です",
    })
    .max(100, {
      message: "タイトルは100文字以内で入力してください",
    }),
});

const CoursesPage = () => {
  const { getToken } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const token = await getToken();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/courses`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      router.push(`/admin/courses/${response.data.data.id}`);
      toast({
        title: "講座を作成しました",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "講座の作成に失敗しました",
      });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="rounded-md bg-black px-4 py-2 text-white">
          講座を作成
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="space-y-6">
            <DialogTitle className="font-normal text-gray-500">
              新しい講座を作成しよう
            </DialogTitle>
            <DialogDescription>
              講座の名前は後で変更できます。気軽に決めましょう。
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      講座タイトル
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Next.js入門講座"
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursesPage;
