import { cookies } from "next/headers";
import { verifySessionToken } from "./auth";

export async function getSessionUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("nexo-session")?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}