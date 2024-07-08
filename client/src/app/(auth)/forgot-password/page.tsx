"use client";

import Link from "next/link";
import { ExternalPasswordResetForm } from "./components/ExternalPasswordResetForm";
import useQueryParams from "@/lib/util/useQueryParams";
import getUser from "@/lib/util/getUser";
import { useEffect, useState } from "react";
import { ExternalNewPasswordForm } from "./components/ExternalNewPasswordForm";

export default function ResetPassword() {
  const [code, setCode] = useState<string | null>(null);
  const { queryParams } = useQueryParams();

  useEffect(() => {
    if (getUser()) window.location.replace("/account/settings");

    setCode(queryParams.get("code"));
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-left font-display mb-5">Reset Password.</h1>

      {code ? <ExternalNewPasswordForm /> : <ExternalPasswordResetForm />}

      <p className="text-sm w-full text-center">
        Or{" "}
        <Link
          className="text-blue-600 hover:text-blue-800 underline"
          href="/login"
        >
          log in here
        </Link>
      </p>
    </div>
  );
}
