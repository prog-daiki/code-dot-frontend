"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

export const AdminButton = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname.startsWith("/admin");
  return (
    <>
      {isTeacherPage ? (
        <Link href="/">
          <Button variant="ghost" size="sm">
            <LogOut className="size-4 mr-2" />
            ホーム
          </Button>
        </Link>
      ) : (
        <Link href="/admin/courses">
          <Button variant="ghost">管理者モード</Button>
        </Link>
      )}
    </>
  );
};
