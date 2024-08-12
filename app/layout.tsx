import { jaJP } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "code.",
  description: "code dot frontend",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={jaJP}>
      <html lang="ja">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
