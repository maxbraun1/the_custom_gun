import Link from "next/link";
import SearchFinishes from "./searchFinishes";

export default function ShopByFinish() {
  return (
    <div className="min-h-[800px]">
      <h1 className="text-4xl font-display mb-4">Popular Finishes</h1>
      <div className="flex gap-5 mb-10">
        <Link
          href="/search?ffinish=gold"
          className="basis-1/4 rounded p-4 bg-gradient-to-tr from-yellow-600 to-amber-400 aspect-square flex items-end"
        >
          <h1 className="text-white text-5xl font-display">Gold</h1>
        </Link>

        <Link
          href="/search?ffinish=rosegold"
          className="basis-1/4 rounded p-4 bg-gradient-to-tr from-fuchsia-400 to-pink-300 aspect-square flex items-end"
        >
          <h1 className="text-white text-5xl font-display">Rose Gold</h1>
        </Link>

        <Link
          href="/search?ffinish=stainlesssteel"
          className="basis-1/4 rounded p-4 bg-gradient-to-tr from-neutral-400 to-stone-200 aspect-square flex items-end"
        >
          <h1 className="text-white text-5xl font-display">
            Stainless
            <br /> Steel
          </h1>
        </Link>

        <Link
          href="/search?ffinish=blacknickel"
          className="basis-1/4 rounded p-4 bg-gradient-to-tr from-neutral-950 to-neutral-700 aspect-square flex items-end"
        >
          <h1 className="text-white text-5xl font-display">
            Black
            <br /> Nickel
          </h1>
        </Link>
      </div>

      <SearchFinishes />
    </div>
  );
}
