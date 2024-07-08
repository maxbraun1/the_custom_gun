import isLoggedIn from "@/lib/util/isLoggedIn";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "New Listing - The Custom Gun",
  description: "Marketplace for customized firearms.",
};

export default async function NewListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(isLoggedIn());
  if (!isLoggedIn()) {
    redirect("/login");
  }
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl p-5 sm:py-10">
        <h2 className="text-4xl font-display w-full mb-5">List a new Item</h2>
        {children}
      </div>
    </div>
  );
}
