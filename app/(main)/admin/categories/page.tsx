"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryForm } from "./_components/category-form";

const CategoriesPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container flex flex-1 py-6">
      <div>
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
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
            <CategoryForm setIsOpen={setIsOpen} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CategoriesPage;
