import { useState } from "react";
import Button from "../Button/Button";
import FormField from "../FormField/FormField";
import styles from "./UrbanDashboard.module.css";

export function DateRangeFields({ from, to, onChange }) {
  return (
    <div className={styles.dateFields}>
      <FormField
        label="Desde"
        type="date"
        value={from}
        onChange={(event) => onChange("from", event.target.value)}
      />
      <FormField
        label="Hasta"
        type="date"
        value={to}
        onChange={(event) => onChange("to", event.target.value)}
      />
    </div>
  );
}

export function FiltersPanel({ from, to, onDateChange, onApply, onClear, children }) {
  const [dateError, setDateError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (from && to && from > to) {
      setDateError("La fecha inicial debe ser igual o anterior a la fecha final.");
      return;
    }
    setDateError("");
    onApply();
  }

  function clear() {
    setDateError("");
    onClear();
  }

  return (
    <form className={styles.filters} onSubmit={submit}>
      <div className={styles.filterFields}>
        <DateRangeFields from={from} to={to} onChange={onDateChange} />
        {children}
      </div>
      <p className={styles.utcHint}>Las fechas se consultan en UTC.</p>
      {dateError && <p className={styles.formError} role="alert">{dateError}</p>}
      <div className={styles.filterActions}>
        <Button type="submit">Aplicar filtros</Button>
        <Button type="button" variant="ghost" onClick={clear}>Limpiar</Button>
      </div>
    </form>
  );
}

export function RequestStatus({ loading, error, hasRows, onRetry }) {
  if (loading) return <p className={styles.status} role="status">Cargando datos…</p>;
  if (error) {
    return (
      <div className={styles.error} role="alert">
        <p>{error}</p>
        <Button variant="ghost" onClick={onRetry}>Reintentar</Button>
      </div>
    );
  }
  if (!hasRows) return <p className={styles.status}>No hay resultados para estos filtros.</p>;
  return null;
}

export function ResultsTable({ columns, rows, loading, error }) {
  if (loading || error || rows.length === 0) return null;

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{columns.map((column) => <th key={column.label}>{column.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row._id ?? `${row.ts ?? row.fecha ?? "row"}-${index}`}>
              {columns.map((column) => (
                <td key={column.label}>{column.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Pagination({ pagination, loading, onPageChange }) {
  if (!pagination) return null;

  return (
    <nav className={styles.pagination} aria-label="Paginación de resultados">
      <Button
        variant="ghost"
        disabled={loading || pagination.page <= 1}
        onClick={() => onPageChange(pagination.page - 1)}
      >
        Anterior
      </Button>
      <span>Página {pagination.page}</span>
      <Button
        variant="ghost"
        disabled={loading || !pagination.hasMore}
        onClick={() => onPageChange(pagination.page + 1)}
      >
        Siguiente
      </Button>
    </nav>
  );
}

export function MetricChart({ title, rows, valueKey, kind = "line" }) {
  const values = rows.map((row) => {
    const value = row[valueKey];
    return {
      label: row.ts ?? row.fecha,
      value: value === null || value === undefined || value === "" ? null : Number(value),
    };
  });
  const measured = values.filter((item) => Number.isFinite(item.value));
  const width = 800;
  const height = 280;
  const padding = { top: 20, right: 24, bottom: 44, left: 54 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const minValue = kind === "bar" ? 0 : Math.min(0, ...measured.map((item) => item.value));
  const maxMeasured = Math.max(0, ...measured.map((item) => item.value));
  const maxValue = maxMeasured === minValue ? minValue + 1 : maxMeasured;
  const x = (index) => padding.left + (values.length < 2 ? chartWidth / 2 : (index / (values.length - 1)) * chartWidth);
  const y = (value) => padding.top + ((maxValue - value) / (maxValue - minValue)) * chartHeight;
  const baseline = y(0);
  const linePath = values.reduce((path, item, index) => {
    if (!Number.isFinite(item.value)) return `${path} `;
    return `${path}${path.endsWith(" ") || path === "" ? "M" : "L"}${x(index)},${y(item.value)} `;
  }, "").trim();
  const labelIndexes = [...new Set([0, Math.floor((values.length - 1) / 2), values.length - 1])];

  return (
    <section className={styles.chartCard} aria-label={title}>
      <div className={styles.sectionHeading}>
        <h3>{title}</h3>
        <span>Datos de la página actual</span>
      </div>
      {measured.length === 0 ? (
        <p className={styles.chartEmpty}>No hay mediciones numéricas para mostrar.</p>
      ) : (
        <div className={styles.chartWrap}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={`${title}. ${measured.length} mediciones.`}
          >
            {[0, 1, 2, 3].map((step) => {
              const gridY = padding.top + (chartHeight * step) / 3;
              const gridValue = maxValue - ((maxValue - minValue) * step) / 3;
              return (
                <g key={step}>
                  <line x1={padding.left} x2={width - padding.right} y1={gridY} y2={gridY} className={styles.gridLine} />
                  <text x={padding.left - 10} y={gridY + 4} textAnchor="end" className={styles.axisLabel}>
                    {Number(gridValue.toFixed(2))}
                  </text>
                </g>
              );
            })}
            {kind === "bar" ? values.map((item, index) => (
              Number.isFinite(item.value) && (
                <rect
                  key={`${item.label}-${index}`}
                  x={x(index) - Math.max(3, chartWidth / values.length / 3)}
                  y={y(item.value)}
                  width={Math.max(6, chartWidth / values.length / 1.5)}
                  height={Math.max(0, baseline - y(item.value))}
                  rx="3"
                  className={styles.bar}
                />
              )
            )) : (
              <path d={linePath} className={styles.line} />
            )}
            {labelIndexes.map((index) => values[index] && (
              <text
                key={`${values[index].label}-${index}`}
                x={x(index)}
                y={height - 12}
                textAnchor="middle"
                className={styles.axisLabel}
              >
                {formatAxisDate(values[index].label)}
              </text>
            ))}
          </svg>
        </div>
      )}
    </section>
  );
}

function formatAxisDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "UTC",
  }).format(date);
}
