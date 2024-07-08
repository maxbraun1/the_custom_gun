import Link from "next/link";
export default function Footer() {
  return (
    <footer className="w-full bg-blue-900 text-white text-md md:text-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-6xl py-10 mx-auto">
        <div className="px-5">
          <h3 className="font-bold">HELP</h3>
          <div className="text-gray-300 flex flex-col">
            <Link href="/support">Support</Link>
            <Link href="/support/feature-request">Request a Feature</Link>
            <Link href="/support/report-issue">Report an Issue</Link>
            <Link href="/forgot-password">Forgot Password</Link>
          </div>
        </div>
        <div className="px-5">
          <h3 className="font-bold">SHOP</h3>
          <div className="text-gray-300 flex flex-col">
            <Link href="/shop/shop-by-finish">Shop by Finish</Link>
            <Link href="/shop/shop-by-brand">Shop by Brand</Link>
            <Link href="/shop/shop-by-caliber">Shop by Caliber</Link>
            <Link href="/shop/shop-by-type">Shop by Type</Link>
          </div>
        </div>
        <div className="px-5">
          <h3 className="font-bold">ABOUT</h3>
          <div className="text-gray-300 flex flex-col">
            <Link href="/info/about-us">About Us</Link>
            <Link href="/info/privacy-policy">Privacy Policy</Link>
            <Link href="/info/terms-of-service">Terms Of Service</Link>
            <Link href="">Link 4</Link>
          </div>
        </div>
        <div className="px-5">
          <h3 className="font-bold">RESOURCES</h3>
          <div className="text-gray-300 flex flex-col">
            <Link target="_blank" href="https://fflezcheck.atf.gov/FFLEzCheck/">
              FFL EZ Check
            </Link>
            <Link href="https://community.thecustomgun.com">
              The Custom Gun Community
            </Link>
            <Link href="">Link 3</Link>
            <Link href="">Link 4</Link>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full flex-col bg-blue-950 p-2 py-4">
        <p className="w-full max-w-6xl">&copy; 2023 The Custom Gun</p>
      </div>
    </footer>
  );
}
