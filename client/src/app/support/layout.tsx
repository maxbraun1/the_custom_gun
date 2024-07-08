import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | The Custom Gun",
  description: "Marketplace for customized firearms.",
};

export default async function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-5xl py-10 sm:py-16">{children}</div>
    </div>
  );
}
