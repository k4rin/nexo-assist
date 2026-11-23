
import { prisma } from "../lib/prisma";
import { randomUUID } from "node:crypto";
import {
  TicketCategory,
  TicketPriority,
  TicketType,
} from "../generated/prisma/client";
import { calculateSlaDeadline } from "../lib/sla";


interface CreateTicketInput {
  title: string;
  description: string;
  type: TicketType;
  category: TicketCategory;
  priority: TicketPriority;
  affectedPerson: string;
  employeeId: string;
}


/**
 * Retorna todos os chamados de um funcionário.
 */
export async function getEmployeeTickets(employeeId: string) {
  return prisma.ticket.findMany({
    where: {
      employeeId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

/**
 * Retorna um chamado específico,
 * desde que pertença ao funcionário informado.
 */
export async function getEmployeeTicketById(
  ticketId: string,
  employeeId: string
) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
      employeeId,
    },
  });
}

/**
 * Normaliza o título para facilitar a identificação de chamados duplicados.
 */
function normalizeTitle(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

/**
 * Cria, atualiza ou reabre um chamado após a confirmação do funcionário.
 */
export async function createTicket(input: CreateTicketInput) {
  const normalizedTitle = normalizeTitle(input.title);

  const existingTickets = await prisma.ticket.findMany({
    where: {
      employeeId: input.employeeId,
      type: input.type,
      category: input.category,
      affectedPerson: input.affectedPerson,
      status: {
        in: ["OPEN", "IN_PROGRESS", "WAITING_ANALYST", "APPROVED", "RESOLVED"],
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const now = new Date();

  const duplicateTicket = existingTickets.find((ticket) => {
    const sameTitle =
      normalizeTitle(ticket.title) === normalizedTitle;

    if (!sameTitle) return false;

    if (ticket.status === "RESOLVED") {
      if (!ticket.resolvedAt) return false;

      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      return ticket.resolvedAt >= sevenDaysAgo;
    }

    return true;
  });

  const slaDeadline = calculateSlaDeadline(input.priority, now);

  if (duplicateTicket) {
    const isResolved = duplicateTicket.status === "RESOLVED";

    const updatedDescription = [
      duplicateTicket.description,
      `\n\nAtualização em ${now.toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      })}:\n${input.description}`,
    ].join("");

    return prisma.ticket.update({
      where: {
        id: duplicateTicket.id,
      },
      data: {
        description: updatedDescription,
        priority: input.priority,
        affectedPerson: input.affectedPerson,
        slaDeadline,
        lastUpdatedAt: now,
        ...(isResolved && {
          status: "OPEN",
          resolvedAt: null,
        }),
      },
    });
  }

  const codePrefix = input.type === "INCIDENT" ? "INC" : "REQ";

  const code = `${codePrefix}-${randomUUID()
    .slice(0, 8)
    .toUpperCase()}`;

  return prisma.ticket.create({
    data: {
      code,
      title: input.title,
      description: input.description,
      type: input.type,
      category: input.category,
      priority: input.priority,
      affectedPerson: input.affectedPerson,
      employeeId: input.employeeId,
      slaDeadline,
      status: "OPEN",
    },
  });
}
