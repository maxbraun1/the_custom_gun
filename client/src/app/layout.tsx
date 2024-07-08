import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import SessionUpdater from "@/components/sessionUpdater";
import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Custom Gun",
  description: "Marketplace for customized firearms.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = hasCookie("connect.sid", { cookies });
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
        <SessionUpdater session={session} />
      </body>
    </html>
  );
}
