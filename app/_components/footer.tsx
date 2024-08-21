import Link from "next/link";

const footerLinks = [
  { href: "/terms", text: "利用規約" },
  { href: "/privacy", text: "プライバシーポリシー" },
];

export const Footer = () => {
  return (
    <footer className="h-20 w-full border-t-2 border-slate-200">
      <div className="container flex h-full items-center justify-start space-x-8 text-muted-foreground">
        {footerLinks.map(({ href, text }) => (
          <Link key={href} href={href} className="hover:underline transition">
            {text}
          </Link>
        ))}
      </div>
    </footer>
  );
};
