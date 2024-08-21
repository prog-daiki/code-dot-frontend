import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Header } from "../_components/header";
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
      <div className="min-h-screen flex flex-col">
        <MarketingHeader />
        <main className="flex-1 flex flex-col items-center justify-center">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
