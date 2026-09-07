import { expect, test } from "vitest";
import { secondsUntilNextUtcDay, utcDay } from "./day";

test("utcDay formats YYYY-MM-DD in UTC, not local", () => {
  const justAfterUtcMidnight = new Date("2026-01-02T00:30:00.000Z");
  expect(utcDay(justAfterUtcMidnight)).toBe("2026-01-02");

  const pacificCalendar = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(justAfterUtcMidnight);
  expect(pacificCalendar).toBe("2026-01-01");
  expect(utcDay(justAfterUtcMidnight)).not.toBe(pacificCalendar);

  expect(utcDay(new Date("2026-06-15T23:59:59.999Z"))).toBe("2026-06-15");
  expect(utcDay(new Date("2026-06-16T00:00:00.000Z"))).toBe("2026-06-16");
});

test("secondsUntilNextUtcDay lasts until the next UTC midnight and is at least 1", () => {
  expect(secondsUntilNextUtcDay(new Date("2026-01-01T00:00:00.000Z"))).toBe(86_400);
  expect(secondsUntilNextUtcDay(new Date("2026-01-01T23:59:59.000Z"))).toBe(1);
  expect(secondsUntilNextUtcDay(new Date("2026-01-01T23:59:59.400Z"))).toBe(1);
});
