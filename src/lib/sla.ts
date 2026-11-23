
import { TicketPriority } from "../generated/prisma/client";

const TIME_ZONE = "America/Sao_Paulo";

const BUSINESS_START = 8;
const BUSINESS_END = 18;

const BUSINESS_MINUTES_PER_DAY = 10 * 60;

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function isBusinessTime(date: Date): boolean {
  const parts = formatter.formatToParts(date);

  const weekday = parts.find(
    (part) => part.type === "weekday"
  )?.value;

  const hour = Number(
    parts.find((part) => part.type === "hour")?.value
  );

  const isWeekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(
    weekday ?? ""
  );

  return (
    isWeekday &&
    hour >= BUSINESS_START &&
    hour < BUSINESS_END
  );
}

function addBusinessMinutes(
  startDate: Date,
  minutes: number
): Date {
  const deadline = new Date(startDate);
  let remainingMinutes = minutes;

  while (remainingMinutes > 0) {
    if (isBusinessTime(deadline)) {
      remainingMinutes--;
    }

    deadline.setTime(deadline.getTime() + 60_000);
  }

  return deadline;
}

export function calculateSlaDeadline(
  priority: TicketPriority,
  createdAt: Date = new Date()
): Date {
  switch (priority) {
    case "CRITICAL":
      // Atendimento crítico funciona 24 horas por dia.
      return new Date(createdAt.getTime() + 60 * 60 * 1000);

    case "HIGH":
      return addBusinessMinutes(createdAt, 4 * 60);

    case "MEDIUM":
      return addBusinessMinutes(
        createdAt,
        3 * BUSINESS_MINUTES_PER_DAY
      );

    case "LOW":
      return addBusinessMinutes(
        createdAt,
        5 * BUSINESS_MINUTES_PER_DAY
      );

    default:
      throw new Error("Prioridade de chamado inválida.");
  }
}
