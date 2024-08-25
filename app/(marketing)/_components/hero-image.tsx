import Image from "next/image";

export const HeroImage = () => {
  return (
    <div className="relative size-[300px] md:size-[450px] lg:size-[500px]">
      <Image
        alt="hero"
        fill
        src="/engineer.jpeg"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
