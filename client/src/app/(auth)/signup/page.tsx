import { SignUpForm } from "@/app/(auth)/signup/components/signupForm";
import Image from "next/image";
import Link from "next/link";

export default async function SignUp() {
  return (
    <div>
      <h4 className="text-3xl text-left font-display mb-5">
        Create an account.
      </h4>
      <Link href={process.env.NEXT_PUBLIC_API_URL + "/auth/google/login"}>
        <button className="flex border border-gray-100 w-full rounded-md gap-2 items-center p-3 hover:bg-gray-100 justify-center">
          <Image
            src="/assets/icons/google-icon.png"
            width="20"
            height="20"
            alt=""
          />
          Sign up with Google
        </button>
      </Link>

      <SignUpForm />
      <p>
        Already have an account?{" "}
        <Link className="text-blue-600 hover:text-blue-800" href="/login">
          Log in here
        </Link>
      </p>
    </div>
  );
}
