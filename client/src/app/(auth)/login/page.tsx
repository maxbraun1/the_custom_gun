import { LogInForm } from "@/app/(auth)/login/components/loginForm";
import Link from "next/link";
import Image from "next/image";

export default async function LogIn() {
  return (
    <div>
      <h1 className="text-3xl text-left font-display mb-5">Log in.</h1>
      <Link href={process.env.NEXT_PUBLIC_API_URL + "/auth/google/login"}>
        <button className="flex border border-gray-100 w-full rounded-md gap-2 items-center p-3 hover:bg-gray-100 justify-center">
          <Image
            src="/assets/icons/google-icon.png"
            width="20"
            height="20"
            alt=""
          />
          Log in with Google
        </button>
      </Link>

      <LogInForm />
      <p>
        Don&apos;t have an account?{" "}
        <Link className="text-blue-600 hover:text-blue-800" href="/signup">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
