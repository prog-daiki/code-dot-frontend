import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <>
      <header className="container h-20 w-full border-b-2 border-slate-200">
        <div className="flex h-full items-center justify-between">
          <h1 className="text-2xl font-bold">
            Code <span className="text-blue-600">.</span>
          </h1>
          <ClerkLoading>
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton
                forceRedirectUrl="/dashboard"
                mode="modal"
              >
                <Button>ログイン</Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </header>
    </>
  );
};
