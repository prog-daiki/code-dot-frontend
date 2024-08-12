import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Sidebar } from "./_components/sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  return (
    <div className="flex gap-x-8">
      <div className="z-50 hidden h-full w-60 flex-col xl:flex">
        <Sidebar />
      </div>
      <main className="w-full pb-12 h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
