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

export async function requireSessionUser(
  allowedRoles?: ("EMPLOYEE" | "ANALYST")[]
) {
  const user = await getSessionUser();

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    throw new Error("FORBIDDEN");
  }

  return user;
}