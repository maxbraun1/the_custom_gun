import Link from "next/link";
import SearchFinishes from "./searchBrands";
import SearchBrands from "./searchBrands";
import Image from "next/image";

export default function ShopByFinish() {
  return (
    <div className="min-h-[800px]">
      <h1 className="text-4xl font-display mb-4">Popular Brands</h1>
      <div className="flex flex-wrap mb-10">
        <Link
          href="/search?brand=colt"
          className="basis-1/4 box-border rounded hover:border aspect-square flex items-center justify-center"
        >
          <div className="relative w-full h-full max-w-[60%] max-h-[80%] aspect-square">
            <Image
              src="/assets/brand-logos/colt.png"
              fill
              objectFit="contain"
              alt="Colt Logo"
            />
          </div>
        </Link>

        <Link
          href="/search?brand=glock"
          className="basis-1/4 box-border rounded hover:border aspect-square flex items-center justify-center"
        >
          <div className="relative w-full h-full max-w-[55%] max-h-[80%] aspect-square">
            <Image
              src="/assets/brand-logos/glock.png"
              fill
              objectFit="contain"
              alt="Glock Logo"
            />
          </div>
        </Link>

        <Link
          href="/search?brand=rock_island_armory"
          className="basis-1/4 box-border rounded hover:border aspect-square flex items-center justify-center"
        >
          <div className="relative w-full h-full max-w-[60%] max-h-[80%] aspect-square">
            <Image
              src="/assets/brand-logos/rock-island.png"
              fill
              objectFit="contain"
              alt="Rock Island Logo"
            />
          </div>
        </Link>

        <Link
          href="/search?brand=sig_sauer"
          className="basis-1/4 box-border rounded hover:border aspect-square flex items-center justify-center"
        >
          <div className="relative w-full h-full max-w-[50%] max-h-[80%] aspect-square">
            <Image
              src="/assets/brand-logos/sig-sauer.png"
              fill
              objectFit="contain"
              alt="Sig Sauer Logo"
            />
          </div>
        </Link>

        <Link
          href="/search?brand=springfield_armory"
          className="basis-1/4 box-border rounded hover:border aspect-square flex items-center justify-center"
        >
          <div className="relative w-full h-full max-w-[50%] max-h-[80%] aspect-square">
            <Image
              src="/assets/brand-logos/springfield.png"
              fill
              objectFit="contain"
              alt="Springfield Logo"
            />
          </div>
        </Link>

        <Link
          href="/search?brand=century_arms"
          className="basis-1/4 box-border rounded hover:border aspect-square flex items-center justify-center"
        >
          <div className="relative w-full h-full max-w-[80%] max-h-[80%] aspect-square">
            <Image
              src="/assets/brand-logos/century-arms.webp"
              fill
              objectFit="contain"
              alt="Century Arms Logo"
            />
          </div>
        </Link>

        <Link
          href="/search?brand=magnum_research"
          className="basis-1/4 box-border rounded hover:border aspect-square flex items-center justify-center"
        >
          <div className="relative w-full h-full max-w-[90%] max-h-[80%] aspect-square">
            <Image
              src="/assets/brand-logos/magnum-research.png"
              fill
              objectFit="contain"
              alt="Magnum Research Logo"
            />
          </div>
        </Link>

        <Link
          href="/search?brand=smith_and_wesson"
          className="basis-1/4 box-border rounded hover:border aspect-square flex items-center justify-center"
        >
          <div className="relative w-full h-full max-w-[80%] max-h-[80%] aspect-square">
            <Image
              src="/assets/brand-logos/smith-and-wesson.png"
              fill
              objectFit="contain"
              alt="Smith & Wesson Logo"
            />
          </div>
        </Link>
      </div>

      <SearchBrands />
    </div>
  );
}
