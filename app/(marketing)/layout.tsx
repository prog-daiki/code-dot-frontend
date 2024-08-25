import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Footer } from "../_components/footer";

import { MarketingHeader } from "./_components/marketing-header";

type Props = {
  children: React.ReactNode;
};

export default function MarketingLayout({ children }: Props) {
  const { userId } = auth();
  if (userId) {
    redirect("/home");
  }
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <MarketingHeader />
        <main className="flex flex-1 flex-col items-center justify-center">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
