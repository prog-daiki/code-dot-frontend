import { jaJP } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

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
        <body className={inter.className}>
          <main className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1 container py-8">{children}</div>
            <Footer />
            <Toaster />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
