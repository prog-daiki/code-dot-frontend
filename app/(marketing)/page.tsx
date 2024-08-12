import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";

export default function MarketingPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-8">
      <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] relative">
        <Image
          src="/engineer.jpeg"
          alt="hero"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="space-y-4">
        <h2 className="text-center text-md md:text-lg lg:text-xl text-gray-800">
          コードを書いて、人生を書き換える
        </h2>
        <SignInButton forceRedirectUrl="/home" mode="modal">
          <Button className="bg-sky-700 hover:bg-sky-900 text-white w-full">
            Code . で学ぶ
          </Button>
        </SignInButton>
      </div>
    </div>
  );
}
