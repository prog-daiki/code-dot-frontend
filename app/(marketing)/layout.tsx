import { Footer } from "@/app/(marketing)/_components/footer";
import { Header } from "@/app/(marketing)/_components/header";

type Props = {
  children: React.ReactNode;
};

export default function MarketingLayout({
  children,
}: Props) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
