import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

const { findManyMock, updateMock, createMock } = vi.hoisted(() => ({
  findManyMock: vi.fn(),
  updateMock: vi.fn(),
  createMock: vi.fn(),
}));

vi.mock("../lib/prisma", () => ({
  prisma: {
    ticket: {
      findMany: findManyMock,
      update: updateMock,
      create: createMock,
    },
  },
}));

import { createTicket } from "./ticket.service";

const input = {
  title: "Falha na VPN",
  description: "A VPN não está conectando.",
  type: "INCIDENT" as const,
  category: "NETWORK_VPN" as const,
  priority: "HIGH" as const,
  affectedPerson: "João Silva",
  employeeId: "employee-1",
};

describe("createTicket", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-23T10:00:00-03:00"));

    findManyMock.mockReset();
    updateMock.mockReset();
    createMock.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("deve atualizar um chamado aberto duplicado", async () => {
    findManyMock.mockResolvedValue([
      {
        id: "ticket-1",
        title: "falha na vpn",
        description: "VPN parou de conectar.",
        status: "OPEN",
      },
    ]);

    updateMock.mockResolvedValue({ id: "ticket-1" });

    await createTicket(input);

    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "ticket-1" },
        data: expect.objectContaining({
          description: expect.stringContaining(input.description),
        }),
      })
    );

    expect(createMock).not.toHaveBeenCalled();
  });

  it("deve reabrir um chamado resolvido há menos de 7 dias", async () => {
    findManyMock.mockResolvedValue([
      {
        id: "ticket-2",
        title: "Falha na VPN",
        description: "VPN não conecta.",
        status: "RESOLVED",
        resolvedAt: new Date("2026-11-20T10:00:00-03:00"),
      },
    ]);

    updateMock.mockResolvedValue({ id: "ticket-2" });

    await createTicket(input);

    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "ticket-2" },
        data: expect.objectContaining({
          status: "OPEN",
          resolvedAt: null,
        }),
      })
    );

    expect(createMock).not.toHaveBeenCalled();
  });

  it("deve criar um novo chamado quando o anterior foi resolvido há mais de 7 dias", async () => {
    findManyMock.mockResolvedValue([
      {
        id: "ticket-3",
        title: "Falha na VPN",
        description: "VPN não conecta.",
        status: "RESOLVED",
        resolvedAt: new Date("2026-11-10T10:00:00-03:00"),
      },
    ]);

    createMock.mockResolvedValue({ id: "ticket-4" });

    await createTicket(input);

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          title: input.title,
          status: "OPEN",
        }),
      })
    );

    expect(updateMock).not.toHaveBeenCalled();
  });

  it("deve criar um novo chamado quando não encontrar duplicidade", async () => {
    findManyMock.mockResolvedValue([]);

    createMock.mockResolvedValue({ id: "ticket-5" });

    await createTicket(input);

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(updateMock).not.toHaveBeenCalled();
  });
});