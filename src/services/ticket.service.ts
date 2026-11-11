
import { prisma } from "../lib/prisma";

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
