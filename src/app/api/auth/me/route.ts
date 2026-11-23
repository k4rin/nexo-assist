import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("nexo-session")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const user = await verifySessionToken(token);

    if (!user) {
      return NextResponse.json(
        { error: "Sessão inválida ou expirada." },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Erro ao consultar sessão:", error);

    return NextResponse.json(
      { error: "Não foi possível consultar a sessão." },
      { status: 500 }
    );
  }
}