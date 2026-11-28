import { useState } from "react";
import FormField from "../../components/FormField/FormField";
import {
  FiltersPanel,
  MetricChart,
  Pagination,
  RequestStatus,
  ResultsTable,
} from "../../components/UrbanDashboard/UrbanDashboard";
import { getTraffic } from "../../api/urbanData.api";
import usePagedData from "../../hooks/usePagedData";
import { displayValue, formatDateTime, toUtcDateFilters } from "../../utils/dashboardDates";

const columns = [
  { label: "Fecha", render: (row) => formatDateTime(row.ts) },
  { label: "Punto", render: (row) => displayValue(row.meta?.idelem) },
  { label: "Tipo", render: (row) => displayValue(row.meta?.tipo_elem) },
  { label: "Intensidad", render: (row) => displayValue(row.intensidad) },
  { label: "Velocidad media", render: (row) => displayValue(row.vmed) },
  { label: "Error", render: (row) => displayValue(row.error) },
];

export default function Traffic() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [idelem, setIdelem] = useState("");
  const [tipoElem, setTipoElem] = useState("");
  const [metric, setMetric] = useState("intensidad");
  const data = usePagedData(getTraffic);

  function applyFilters() {
    data.applyFilters({
      ...toUtcDateFilters(from, to),
      ...(idelem !== "" ? { idelem: Number(idelem) } : {}),
      ...(tipoElem.trim() ? { tipo_elem: tipoElem.trim() } : {}),
    });
  }

  function clearFilters() {
    setFrom("");
    setTo("");
    setIdelem("");
    setTipoElem("");
    setMetric("intensidad");
    data.clearFilters();
  }

  return (
    <section>
      <p className="eyebrow">Movilidad</p>
      <h2>Tráfico</h2>
      <p>Consulta mediciones de tráfico por fecha y punto de medida.</p>

      <FiltersPanel
        from={from}
        to={to}
        onDateChange={(name, value) => (name === "from" ? setFrom(value) : setTo(value))}
        onApply={applyFilters}
        onClear={clearFilters}
      >
        <FormField
          label="ID del punto"
          type="number"
          min="1"
          step="1"
          placeholder="Ej. 1001"
          value={idelem}
          onChange={(event) => setIdelem(event.target.value)}
        />
        <FormField
          label="Tipo de elemento"
          placeholder="Ej. M30"
          value={tipoElem}
          onChange={(event) => setTipoElem(event.target.value)}
        />
        <div className="metricField">
          <label htmlFor="traffic-metric">Métrica del gráfico</label>
          <select id="traffic-metric" value={metric} onChange={(event) => setMetric(event.target.value)}>
            <option value="intensidad">Intensidad</option>
            <option value="vmed">Velocidad media</option>
          </select>
        </div>
      </FiltersPanel>

      <RequestStatus
        loading={data.loading}
        error={data.error}
        hasRows={data.rows.length > 0}
        onRetry={data.retry}
      />

      {data.filters.idelem !== undefined && !data.loading && !data.error ? (
        <MetricChart
          title={`${metric === "intensidad" ? "Intensidad" : "Velocidad media"} por fecha · punto ${data.filters.idelem}`}
          rows={data.rows}
          valueKey={metric}
        />
      ) : data.filters.idelem === undefined ? (
        <section className="chartHint">
          <h3>Explora la serie temporal</h3>
          <p>Selecciona un ID de punto y pulsa Aplicar para mostrar su métrica en el gráfico.</p>
        </section>
      ) : null}

      <section className="tableSection">
        <div className="tableHeading">
          <h3>Mediciones</h3>
          <span>Datos de la página actual</span>
        </div>
        <ResultsTable columns={columns} rows={data.rows} loading={data.loading} error={data.error} />
        <Pagination pagination={data.pagination} loading={data.loading} onPageChange={data.goToPage} />
      </section>
    </section>
  );
}
