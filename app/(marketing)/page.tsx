import { HeroImage } from "./_components/hero-image";
import { CallAction } from "./_components/call-action";

export default function MarketingPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-8">
      <HeroImage />
      <CallAction />
    </div>
  );
}
