export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-start w-full min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="bg-white basis-full lg:basis-96 md:basis-96 p-10">
        {children}
      </div>
    </div>
  );
}
