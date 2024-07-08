import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leave a Review | The Custom Gun",
  description: "The marketplace for customized firearms.",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl py-10">{children}</div>
    </div>
  );
}
