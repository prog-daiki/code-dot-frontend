"use client";

import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

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

export const CreateCourse = () => {
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
      console.log(response.data.id);
      router.push(`/admin/courses/${response.data.id}`);
      toast({
        title: "講座を作成しました",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "講座の作成に失敗しました",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="rounded-md bg-sky-700 hover:bg-sky-900 transition px-4 py-2 text-white flex items-center">
        <PlusCircle className="size-4 mr-2" />
        講座を作成
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="font-normal text-gray-500">
            新しい講座を作成しよう
          </DialogTitle>
          <DialogDescription>講座の名前は後で変更が可能です</DialogDescription>
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
              <Button
                disabled={isSubmitting}
                type="submit"
                className="bg-sky-700 hover:bg-sky-900"
              >
                作成する
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
