import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export const CallAction = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-center text-md md:text-lg lg:text-xl text-gray-800">
        コードを書いて、人生を書き換える
      </h2>
      <SignInButton forceRedirectUrl="/home" mode="modal">
        <Button className="bg-sky-700 hover:bg-sky-900 text-white w-full">
          Code. で学ぶ
        </Button>
      </SignInButton>
    </div>
  );
};
