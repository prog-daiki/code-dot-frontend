import { Footer } from "../_components/footer";

import { MarketingHeader } from "./_components/marketing-header";

type Props = {
  children: React.ReactNode;
};

export default function MarketingLayout({ children }: Props) {
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
