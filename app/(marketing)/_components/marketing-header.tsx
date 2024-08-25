import { SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import { HeaderLogo } from "@/app/_components/header-logo";

export const MarketingHeader = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200">
      <div className="container flex h-full items-center justify-between">
        <HeaderLogo />
        <div className="flex items-center gap-x-8">
          <SignInButton forceRedirectUrl="/home" mode="modal">
            <Button className="w-full bg-sky-700 text-white hover:bg-sky-900">
              ログイン
            </Button>
          </SignInButton>
        </div>
      </div>
    </header>
  );
};
