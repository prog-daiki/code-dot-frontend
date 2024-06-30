"use client";

import { Home, Layout } from "lucide-react";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Home,
    label: "Home",
    href: "/home",
  },
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
];

export const SidebarRoutes = () => {
  const routes = guestRoutes;
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
