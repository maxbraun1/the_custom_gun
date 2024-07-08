"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import getUserClientSide from "@/lib/util/getUser";
import { user } from "@/lib/types/user";
import { useSession } from "../useSession";

export default function VerifyEmail() {
  const [user, setUser] = useState<null | user>(null);

  useEffect(() => {
    const user = getUserClientSide();
    setUser(user);
    console.log(user);
    if (!user) window.location.replace("/login");
    if (user?.verified) window.location.replace("/");
  }, []);
  const [codeInput, setCodeInput] = useState<number | null>(null);
  const [verifyButtonLoading, setVerifyButtonLoading] = useState(false);
  const [resendButtonLoading, setResendButtonLoading] = useState(false);

  const searchParams = useSearchParams();
  const code = Number(searchParams.get("code"));

  useEffect(() => {
    if (code) {
      verifyEmail(code);
    }
  }, []);

  async function verifyEmail(code: number | null) {
    setVerifyButtonLoading(true);
    await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/verify",
        { code },
        {
          withCredentials: true,
        }
      )
      .then((response: AxiosResponse) => {
        if (!response.data.error) {
          // Correct Code
          useSession.setState({ user: response.data.user });
          window.location.replace("/account");
        } else {
          // Incorrect Code
          toast({
            variant: "destructive",
            title:
              "Incorrect verification code. Try again or resend verification email.",
          });
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);
        toast({
          variant: "destructive",
          title:
            "An error occured while verifying your email. Please try again later.",
        });
      });
    setVerifyButtonLoading(false);
  }

  async function resendVerification() {
    setResendButtonLoading(true);
    await axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/auth/request_verification", {
        withCredentials: true,
      })
      .then(() => {
        toast({
          title: "Verification email resent.",
        });
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
    setResendButtonLoading(false);
  }

  return (
    <div>
      <h1 className="text-3xl text-left font-display">Verify your Email.</h1>
      <p className="text-gray-500 text-sm">
        A verification email has been sent. Please click the link or enter the
        code provided in that email to verify your email address.
      </p>
      <Separator className="my-7" />
      <Label htmlFor="code">Verification Code</Label>
      <Input
        className="my-3"
        id="code"
        type="text"
        placeholder="Ex: 12345"
        onChange={(e) => setCodeInput(Number(e.target.value))}
      />
      <div className="flex items-center justify-start gap-3">
        <span
          onClick={resendVerification}
          className="text-blue-700 underline cursor-pointer text-sm"
        >
          Resend Verification Email
        </span>
        {resendButtonLoading && <LoadingSpinner className="w-auto" size={15} />}
      </div>
      <div>
        <Button
          onClick={() => verifyEmail(codeInput)}
          className="w-full bg-blue-800 hover:bg-blue-900 mt-5"
        >
          {verifyButtonLoading ? <Spinner size={20} /> : "Verify Email"}
        </Button>
      </div>
    </div>
  );
}
