import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
      <main>{children}</main>
    </>
  );
}
