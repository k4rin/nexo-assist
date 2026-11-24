import { beforeEach, describe, expect, it, vi } from "vitest";

const { requireSessionUserMock, createTicketMock } = vi.hoisted(() => ({
  requireSessionUserMock: vi.fn(),
  createTicketMock: vi.fn(),
}));

vi.mock("@/lib/session", () => ({
  requireSessionUser: requireSessionUserMock,
}));

vi.mock("@/services/ticket.service", () => ({
  getEmployeeTickets: vi.fn(),
  createTicket: createTicketMock,
}));

import { POST } from "./route";

const validTicket = {
  title: "Falha na VPN",
  description: "A VPN não está conectando.",
  type: "INCIDENT",
  category: "NETWORK_VPN",
  priority: "HIGH",
  affectedPerson: "João Silva",
};

describe("POST /api/tickets", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    requireSessionUserMock.mockResolvedValue({
      id: "employee-1",
      name: "João Silva",
      email: "funcionario@nexo.test",
      role: "EMPLOYEE",
    });

    createTicketMock.mockResolvedValue({
      id: "ticket-1",
      code: "INC-12345678",
      ...validTicket,
      employeeId: "employee-1",
    });
  });

  it("deve criar um chamado para o funcionário autenticado", async () => {
    const request = new Request("http://localhost/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validTicket),
    });

    const response = await POST(request as never);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ticket.code).toBe("INC-12345678");
  });

  it("deve retornar 401 quando o usuário não estiver autenticado", async () => {
    requireSessionUserMock.mockRejectedValue(
      new Error("UNAUTHORIZED")
    );

    const request = new Request("http://localhost/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validTicket),
    });

    const response = await POST(request as never);

    expect(response.status).toBe(401);
    expect(createTicketMock).not.toHaveBeenCalled();
  });

  it("deve retornar 403 quando o usuário não tiver permissão", async () => {
    requireSessionUserMock.mockRejectedValue(
      new Error("FORBIDDEN")
    );

    const request = new Request("http://localhost/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validTicket),
    });

    const response = await POST(request as never);

    expect(response.status).toBe(403);
    expect(createTicketMock).not.toHaveBeenCalled();
  });

  it("deve retornar 400 quando os dados forem inválidos", async () => {
    const invalidTicket = {
      ...validTicket,
      priority: "URGENT",
    };

    const request = new Request("http://localhost/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidTicket),
    });

    const response = await POST(request as never);

    expect(response.status).toBe(400);
    expect(createTicketMock).not.toHaveBeenCalled();
  });

  it("deve utilizar o ID da sessão e ignorar o employeeId enviado", async () => {
    const request = new Request("http://localhost/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...validTicket,
        employeeId: "employee-999",
      }),
    });

    await POST(request as never);

    expect(createTicketMock).toHaveBeenCalledWith(
      expect.objectContaining({
        employeeId: "employee-1",
      })
    );
  });
});