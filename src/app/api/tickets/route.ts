import {  NextRequest, NextResponse } from "next/server";
import { requireSessionUser } from "@/lib/session";
import { getEmployeeTickets } from "@/services/ticket.service";
import { createTicket } from "@/services/ticket.service";
import {
  TicketCategory,
  TicketPriority,
  TicketType,
} from "@/generated/prisma/client";


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
const ticketTypes = ["INCIDENT", "REQUEST"];
const ticketCategories = [
  "ACCESS",
  "NETWORK_VPN",
  "HARDWARE",
  "SOFTWARE",
  "EMAIL",
  "OTHER",
];
const ticketPriorities = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];

export async function POST(request: NextRequest) {
  try {
    const user = await requireSessionUser(["EMPLOYEE"]);

    const body = await request.json();

    const {
      title,
      description,
      type,
      category,
      priority,
      affectedPerson,
    } = body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof affectedPerson !== "string" ||
      !affectedPerson.trim() ||
      !ticketTypes.includes(type) ||
      !ticketCategories.includes(category) ||
      !ticketPriorities.includes(priority)
    ) {
      return NextResponse.json(
        { error: "Dados do chamado inválidos ou incompletos." },
        { status: 400 }
      );
    }

    const ticket = await createTicket({
      title: title.trim(),
      description: description.trim(),
      type: type as TicketType,
      category: category as TicketCategory,
      priority: priority as TicketPriority,
      affectedPerson: affectedPerson.trim(),
      employeeId: user.id,
    });

    return NextResponse.json({ ticket }, { status: 200 });
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

    console.error("Erro ao criar chamado:", error);

    return NextResponse.json(
      { error: "Erro interno ao criar chamado." },
      { status: 500 }
    );
  }
}