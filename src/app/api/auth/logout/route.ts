import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Logout realizado com sucesso.",
  });

  response.cookies.set("nexo-session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}