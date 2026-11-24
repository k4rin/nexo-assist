import { NextResponse } from "next/server";
import { requireSessionUser } from "@/lib/session";
import { getEmployeeTickets } from "@/services/ticket.service";

export async function GET() {
  try {
    // Verifica se existe uma sessão válida de funcionário
    const user = await requireSessionUser(["EMPLOYEE"]);

    // Busca somente os chamados vinculados ao funcionário autenticado
    const tickets = await getEmployeeTickets(user.id);

    return NextResponse.json({ tickets });
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

    console.error("Erro ao buscar chamados:", error);

    return NextResponse.json(
      { error: "Erro interno ao buscar chamados." },
      { status: 500 }
    );
  }
}