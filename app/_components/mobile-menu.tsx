import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Sidebar } from "../(main)/_components/sidebar";

export const MobileMenu = () => {
  return (
    <>
      <Sheet>
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
