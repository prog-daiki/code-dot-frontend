"use client";

import {
  BarChart,
  Book,
  Home,
  Layout,
  List,
} from "lucide-react";

import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Home,
    label: "ホーム",
    href: "/home",
  },
  {
    icon: Layout,
    label: "ダッシュボード",
    href: "/dashboard",
  },
];

const adminRoutes = [
  {
    icon: List,
    label: "講座一覧",
    href: "/admin/courses",
  },
  {
    icon: Book,
    label: "カテゴリー管理",
    href: "/admin/categories",
  },
  {
    icon: BarChart,
    label: "売上管理",
    href: "/admin/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin");
  const routes = isAdminPage ? adminRoutes : guestRoutes;
  return (
    <>
      <div className="flex w-full flex-col">
        {routes.map((route) => (
          <SidebarItem
            href={route.href}
            icon={route.icon}
            key={route.href}
            label={route.label}
          />
        ))}
      </div>
    </>
  );
};
