export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl p-5 sm:py-10">{children}</div>
    </div>
  );
}
