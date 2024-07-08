import { redirect } from "next/navigation";
import { Metadata } from "next";
import isLoggedIn from "@/lib/util/isLoggedIn";

export const metadata: Metadata = {
  title: "Checkout - The Custom Gun",
  description: "Marketplace for customized firearms.",
};

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isLoggedIn()) {
    redirect("/login");
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl p-5 sm:py-10">
        <h2 className="text-4xl font-display w-full mb-5">Checkout</h2>
        {children}
      </div>
    </div>
  );
}
