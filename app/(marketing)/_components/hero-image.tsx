import Image from "next/image";

export const HeroImage = () => {
  return (
    <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] relative">
      <Image
        src="/engineer.jpeg"
        alt="hero"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
