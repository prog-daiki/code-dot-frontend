import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Sidebar } from "../(main)/_components/sidebar";

import { HeaderLogo } from "./header-logo";

export const MobileMenu = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="pr-4 transition hover:bg-opacity-75 md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent className="bg-white" side="left">
          <HeaderLogo />
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  );
};
