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

export const AuthButtons = () => {
  return (
    <>
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
    </>
  );
};
