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
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/isAdmin";

export const Header = async () => {
  const { userId } = auth();
  const admin = await isAdmin(userId);

  return (
    <>
      <header className="h-20 w-full border-b-2 border-slate-200">
        <div className="container flex h-full items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold">
              Code <span className="text-blue-600">.</span>
            </h1>
          </Link>
          <div className="flex items-center gap-x-8">
            {admin && (
              <Link href="/admin/courses">
                <Button variant="ghost">
                  管理者モード
                </Button>
              </Link>
            )}
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
        </div>
      </header>
    </>
  );
};
