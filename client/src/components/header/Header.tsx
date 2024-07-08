import Link from "next/link";
import HeaderMenu from "./headerMenu";
import SearchBar from "@/app/search/components/searchBar";

export default async function Header() {
  return (
    <>
      <div id="spacer" className=" h-[59px]"></div>
      <nav
        id="navBar"
        className="w-full fixed top-0 flex z-50 bg-white py-2 px-5 border-b border-gray-200 flex-col items-center"
      >
        <div className="max-w-6xl w-full flex gap-5 justify-between items-center sm:gap-10">
          <Link href="/">
            <div className="text-black text-3xl font-display">TCG</div>
          </Link>

          <div className="flex-grow">
            <SearchBar />
          </div>

          <div className="flex items-center">
            <HeaderMenu />
          </div>
        </div>
      </nav>
    </>
  );
}
