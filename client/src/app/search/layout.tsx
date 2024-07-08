import SearchMobileSidebar from "./components/searchMobileSidebar";
import SearchSidebar from "./components/searchSidebar";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-reasonable flex flex-col w-full max-w-6xl mx-auto lg:flex-row">
      <SearchSidebar className="hidden lg:block" />
      <SearchMobileSidebar />
      <div className="basis-3/4">{children}</div>
    </div>
  );
}
