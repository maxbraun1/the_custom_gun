import { user } from "../types/user";

export default async function userVerified(user: user) {
  if (!user.verified) window.location.replace("/verify-email");
}
