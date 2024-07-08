import Link from "next/link";

export default function ShopByType() {
  return (
    <div className="min-h-[800px]">
      <h1 className="text-4xl font-display mb-4">Shop by Type</h1>
      <div className="flex gap-3">
        <Link
          href="/search?itype=pistol"
          className="basis-1/4 aspect-square rounded p-5 bg-gray-100 hover:bg-gray-200"
        >
          Pistols
        </Link>
        <Link
          href="/search?itype=revolver"
          className="basis-1/4 aspect-square rounded p-5 bg-gray-100 hover:bg-gray-200"
        >
          Revolvers
        </Link>
        <Link
          href="/search?itype=rifle"
          className="basis-1/4 aspect-square rounded p-5 bg-gray-100 hover:bg-gray-200"
        >
          Rifles
        </Link>
        <Link
          href="/search?itype=shotgun"
          className="basis-1/4 aspect-square rounded p-5 bg-gray-100 hover:bg-gray-200"
        >
          Shotguns
        </Link>
      </div>
    </div>
  );
}
