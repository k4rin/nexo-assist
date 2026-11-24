import { NextRequest, NextResponse } from "next/server";
import { requireSessionUser } from "@/lib/session";
import { getEmployeeTicketById } from "@/services/ticket.service";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const user = await requireSessionUser(["EMPLOYEE"]);

    const { id } = await context.params;

    const ticket = await getEmployeeTicketById(id, user.id);

    if (!ticket) {
      return NextResponse.json(
        { error: "Chamado não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ ticket });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    if (error instanceof Error && error.message === "FORBIDDEN") {
      return NextResponse.json(
        { error: "Você não tem permissão para acessar este recurso." },
        { status: 403 }
      );
    }

    console.error("Erro ao buscar chamado:", error);

    return NextResponse.json(
      { error: "Erro interno ao buscar chamado." },
      { status: 500 }
    );
  }
}