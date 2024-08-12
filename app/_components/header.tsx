import { auth } from "@clerk/nextjs/server";

import { isAdmin } from "@/lib/isAdmin";

import { AdminButton } from "./admin-button";
import { AuthButtons } from "./auth-buttons";
import { HeaderLogo } from "./header-logo";
import { MobileMenu } from "./mobile-menu";

export const Header = async () => {
  const { userId } = auth();
  const admin = await isAdmin(userId);

  return (
    <header className="h-20 w-full border-b-2 border-slate-200">
      <div className="container flex h-full items-center justify-between">
        {userId ? <MobileMenu /> : <HeaderLogo />}
        <div className="hidden xl:block">
          <HeaderLogo />
        </div>
        <div className="flex items-center gap-x-8">
          {admin && <AdminButton />}
          <AuthButtons />
        </div>
      </div>
    </header>
  );
};
