import { auth } from "@clerk/nextjs/server";
import { CallAction } from "./_components/call-action";
import { HeroImage } from "./_components/hero-image";
import { redirect } from "next/navigation";

export default function MarketingPage() {
  const { userId } = auth();
  if (userId) {
    redirect("/home");
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-8">
      <HeroImage />
      <CallAction />
    </div>
  );
}
