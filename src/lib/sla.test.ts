import { describe, expect, it } from "vitest";
import { calculateSlaDeadline } from "./sla";

describe("calculateSlaDeadline", () => {
  it("deve adicionar 1 hora corrida para prioridade crítica", () => {
    const createdAt = new Date("2026-11-23T09:00:00-03:00");

    const result = calculateSlaDeadline("CRITICAL", createdAt);

    expect(result.toISOString()).toBe(
      new Date("2026-11-23T10:00:00-03:00").toISOString()
    );
  });

  it("deve adicionar 4 horas úteis para prioridade alta", () => {
    const createdAt = new Date("2026-11-27T16:00:00-03:00");

    const result = calculateSlaDeadline("HIGH", createdAt);

    // Sexta-feira, 16h + 2 horas.
    // As 2 horas restantes são cumpridas na segunda-feira.
    expect(result.toISOString()).toBe(
      new Date("2026-11-30T10:00:00-03:00").toISOString()
    );
  });

  it("deve adicionar 3 dias úteis para prioridade média", () => {
    const createdAt = new Date("2026-11-23T09:00:00-03:00");

    const result = calculateSlaDeadline("MEDIUM", createdAt);

    expect(result.toISOString()).toBe(
      new Date("2026-11-26T09:00:00-03:00").toISOString()
    );
  });

  it("deve adicionar 5 dias úteis para prioridade baixa", () => {
    const createdAt = new Date("2026-11-23T09:00:00-03:00");

    const result = calculateSlaDeadline("LOW", createdAt);

    expect(result.toISOString()).toBe(
      new Date("2026-11-30T09:00:00-03:00").toISOString()
    );
  });

  it("deve começar a contar o SLA no próximo expediente quando criado no fim de semana", () => {
    const createdAt = new Date("2026-11-28T10:00:00-03:00");

    const result = calculateSlaDeadline("HIGH", createdAt);

    expect(result.toISOString()).toBe(
      new Date("2026-11-30T12:00:00-03:00").toISOString()
    );
  });

  it("deve começar a contar o SLA no próximo expediente quando criado fora do horário comercial", () => {
    const createdAt = new Date("2026-11-23T19:00:00-03:00");

    const result = calculateSlaDeadline("HIGH", createdAt);

    expect(result.toISOString()).toBe(
      new Date("2026-11-24T12:00:00-03:00").toISOString()
    );
  });
});