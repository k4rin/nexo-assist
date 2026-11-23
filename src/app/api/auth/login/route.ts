import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const password =
      typeof body.password === "string" ? body.password : "";

    if (!email || !password.trim()) {
      return NextResponse.json(
        { error: "Informe seu e-mail e senha." },
        { status: 400 }
      );
    }

    const employee = await prisma.employee.findUnique({
      where: { email },
    });

    if (!employee) {
      return NextResponse.json(
        { error: "E-mail não encontrado." },
        { status: 401 }
      );
    }

    const token = await createSessionToken({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
    });

    const response = NextResponse.json({
      message: "Login realizado com sucesso.",
      user: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });

    response.cookies.set("nexo-session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Erro no login:", error);

    return NextResponse.json(
      { error: "Não foi possível realizar o login." },
      { status: 500 }
    );
  }
}