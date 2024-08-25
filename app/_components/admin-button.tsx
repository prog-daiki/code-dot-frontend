"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export const AdminButton = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {isAdminPage ? (
        <Link href="/home">
          <Button size="sm" variant="ghost">
            <LogOut className="mr-2 size-4" />
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
