import { SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const CallAction = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-md text-center text-gray-800 md:text-lg lg:text-xl">
        コードを書いて、人生を書き換える
      </h2>
      <SignInButton forceRedirectUrl="/home" mode="modal">
        <Button className="w-full bg-sky-700 text-white hover:bg-sky-900">
          Code. で学ぶ
        </Button>
      </SignInButton>
    </div>
  );
};
