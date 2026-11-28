import { useState } from "react";
import FormField from "../../components/FormField/FormField";
import {
  FiltersPanel,
  MetricChart,
  Pagination,
  RequestStatus,
  ResultsTable,
} from "../../components/UrbanDashboard/UrbanDashboard";
import { getAirQuality } from "../../api/urbanData.api";
import usePagedData from "../../hooks/usePagedData";
import { displayValue, formatDateTime, toUtcDateFilters } from "../../utils/dashboardDates";

const columns = [
  { label: "Fecha", render: (row) => formatDateTime(row.ts) },
  { label: "Estación", render: (row) => displayValue(row.meta?.estacion_id) },
  { label: "Magnitud", render: (row) => displayValue(row.meta?.magnitud ?? row.meta?.magnitud_cod) },
  { label: "Valor", render: (row) => displayValue(row.valor) },
];

export default function AirQuality() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [stationId, setStationId] = useState("");
  const [magnitude, setMagnitude] = useState("");
  const [magnitudeCode, setMagnitudeCode] = useState("");
  const data = usePagedData(getAirQuality);

  function applyFilters() {
    data.applyFilters({
      ...toUtcDateFilters(from, to),
      ...(stationId.trim() ? { estacion_id: stationId.trim() } : {}),
      ...(magnitude.trim() ? { magnitud: magnitude.trim() } : {}),
      ...(magnitudeCode !== "" ? { magnitud_cod: Number(magnitudeCode) } : {}),
    });
  }

  function clearFilters() {
    setFrom("");
    setTo("");
    setStationId("");
    setMagnitude("");
    setMagnitudeCode("");
    data.clearFilters();
  }

  const magnitudeSelected = data.filters.magnitud || data.filters.magnitud_cod !== undefined;
  const selectedStation = data.filters.estacion_id;

  return (
    <section>
      <p className="eyebrow">Medio ambiente</p>
      <h2>Calidad del aire</h2>
      <p>Consulta los valores horarios registrados por estación y magnitud.</p>

      <FiltersPanel
        from={from}
        to={to}
        onDateChange={(name, value) => (name === "from" ? setFrom(value) : setTo(value))}
        onApply={applyFilters}
        onClear={clearFilters}
      >
        <FormField
          label="ID de estación"
          placeholder="Ej. 28079004"
          value={stationId}
          onChange={(event) => setStationId(event.target.value)}
        />
        <FormField
          label="Magnitud"
          placeholder="Nombre o código"
          value={magnitude}
          onChange={(event) => setMagnitude(event.target.value)}
        />
        <FormField
          label="Código de magnitud"
          type="number"
          step="1"
          placeholder="Opcional"
          value={magnitudeCode}
          onChange={(event) => setMagnitudeCode(event.target.value)}
        />
      </FiltersPanel>

      <RequestStatus
        loading={data.loading}
        error={data.error}
        hasRows={data.rows.length > 0}
        onRetry={data.retry}
      />

      {selectedStation && magnitudeSelected && !data.loading && !data.error ? (
        <MetricChart
          title={`Valor por fecha · estación ${selectedStation} · magnitud ${data.filters.magnitud ?? data.filters.magnitud_cod}`}
          rows={data.rows}
          valueKey="valor"
        />
      ) : !selectedStation || !magnitudeSelected ? (
        <section className="chartHint">
          <h3>Explora la serie temporal</h3>
          <p>Selecciona una estación y una magnitud, y pulsa Aplicar para mostrar sus valores.</p>
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
