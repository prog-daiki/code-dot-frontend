import { HeaderLogo } from "@/app/_components/header-logo";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export const MarketingHeader = async () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200">
      <div className="container flex h-full items-center justify-between">
        <HeaderLogo />
        <div className="flex items-center gap-x-8">
          <SignInButton forceRedirectUrl="/home" mode="modal">
            <Button className="bg-sky-700 hover:bg-sky-900 text-white w-full">
              ログイン
            </Button>
          </SignInButton>
        </div>
      </div>
    </header>
  );
};
