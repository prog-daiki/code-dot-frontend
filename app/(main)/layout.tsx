import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Toaster } from "@/components/ui/toaster";

import { ConfettiProvider } from "@/providers/confetti-provider";

import { Footer } from "../_components/footer";
import { Header } from "../_components/header";

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
    <>
      <ConfettiProvider />
      <main className="flex min-h-screen flex-col">
        <Header />
        <div className="container flex-1 py-8">
          <div className="flex gap-x-8">
            <div className="z-50 hidden h-full w-60 flex-col xl:flex">
              <Sidebar />
            </div>
            <main className="size-full pb-12">{children}</main>
          </div>
        </div>
        <Footer />
        <Toaster />
      </main>
    </>
  );
};

export default MainLayout;
