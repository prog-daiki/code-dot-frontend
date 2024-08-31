import { SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CallAction = () => {
  return (
    <div className="space-y-10">
      <h2 className="text-md text-center text-black font-bold md:text-lg lg:text-2xl">
        コードを書いて、人生を書き換える。
      </h2>
      <SignInButton forceRedirectUrl="/home" mode="modal">
        <Button className="w-[300px] bg-sky-700 text-white hover:bg-sky-900 text-xl py-8 lg:text-2xl">
          Code. で学ぶ
          <ArrowRight className="ml-2 w-6 h-6" />
        </Button>
      </SignInButton>
    </div>
  );
};
