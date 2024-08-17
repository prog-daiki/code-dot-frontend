import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <footer className="h-20 w-full border-t-2 border-slate-200">
        <div className="container flex h-full items-center justify-start space-x-8 text-muted-foreground">
          <Link href="/terms" className="hover:underline transition">
            利用規約
          </Link>
          <Link href="/privacy" className="hover:underline transition">
            プライバシーポリシー
          </Link>
        </div>
      </footer>
    </>
  );
};
