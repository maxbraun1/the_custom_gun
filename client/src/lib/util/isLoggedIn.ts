import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default function isLoggedIn() {
  let session = getCookie("connect.sid", { cookies });

  if (!session) {
    return null;
  }

  return true;
}
