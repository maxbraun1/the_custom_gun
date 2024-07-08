import AccountMenu from "@/app/account/components/accountMenu";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AccountMobileMenu from "./components/accountMobileMenu";
import isLoggedIn from "@/lib/util/isLoggedIn";

export const metadata: Metadata = {
  title: "Account | The Custom Gun",
  description: "Marketplace for customized firearms.",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isLoggedIn()) {
    redirect("/login");
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl p-0 lg:py-5">
        <div
          className="flex lg:border lg:border-gray-200 border-0 rounded-md overflow-hidden"
          style={{ minHeight: "800px" }}
        >
          <div
            className="lg:basis-1/4 lg:block hidden basis-full"
            style={{ borderRight: "1px solid gainsboro" }}
          >
            <AccountMenu />
          </div>
          <div className="lg:basis-3/4 basis-full flex flex-col">
            <AccountMobileMenu />

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
