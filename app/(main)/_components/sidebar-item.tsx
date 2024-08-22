"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({ icon: Icon, label, href }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  return (
    <Button
      variant="sidebar"
      className={cn(
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700",
      )}
      onClick={() => router.push(href)}
      size="lg"
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          className={cn("text-slate-500", isActive && "text-sky-700")}
          size={22}
        />
        {label}
      </div>
    </Button>
  );
};
