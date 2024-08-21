import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Link href="/home">
      <h1 className="text-2xl font-bold">
        Code <span className="text-blue-600">.</span>
      </h1>
    </Link>
  );
};
