export function toUtcDateFilters(from, to) {
  const filters = {};
  if (from) filters.desde = `${from}T00:00:00.000Z`;
  if (to) filters.hasta = `${to}T23:59:59.999Z`;
  return filters;
}

export function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

export function displayValue(value) {
  return value === null || value === undefined || value === "" ? "—" : value;
}
