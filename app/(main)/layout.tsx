import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Sidebar } from "./_components/sidebar";
import { ConfettiProvider } from "@/providers/confetti-provider";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  return (
    <>
      <ConfettiProvider />
      <main className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 container py-8">
          <div className="flex gap-x-8">
            <div className="z-50 hidden h-full w-60 flex-col xl:flex">
              <Sidebar />
            </div>
            <main className="w-full pb-12 h-full">{children}</main>
          </div>
        </div>
        <Footer />
        <Toaster />
      </main>
    </>
  );
};

export default MainLayout;
