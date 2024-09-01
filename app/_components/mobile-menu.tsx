"use client";

import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Sidebar } from "../(main)/_components/sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="pr-4 transition hover:bg-opacity-75 xl:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent className="bg-white" side="left">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  );
};
