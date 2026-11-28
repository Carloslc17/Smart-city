import { useState } from "react";
import FormField from "../../components/FormField/FormField";
import {
  FiltersPanel,
  MetricChart,
  Pagination,
  RequestStatus,
  ResultsTable,
} from "../../components/UrbanDashboard/UrbanDashboard";
import { getAccidents } from "../../api/urbanData.api";
import usePagedData from "../../hooks/usePagedData";
import { displayValue, formatDateTime, toUtcDateFilters } from "../../utils/dashboardDates";

const columns = [
  { label: "Fecha", render: (row) => formatDateTime(row.fecha) },
  { label: "Distrito", render: (row) => displayValue(row.distrito) },
  { label: "Tipo", render: (row) => displayValue(row.tipo_accidente) },
  { label: "Gravedad", render: (row) => displayValue(row.gravedad_max) },
  { label: "Afectados", render: (row) => displayValue(row.n_afectados) },
];

function groupByDay(rows) {
  const counts = new Map();
  rows.forEach((row) => {
    if (!row.fecha) return;
    const date = new Date(row.fecha);
    if (Number.isNaN(date.getTime())) return;
    const day = date.toISOString().slice(0, 10);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  });

  return [...counts].sort(([first], [second]) => first.localeCompare(second))
    .map(([day, accidents]) => ({ fecha: `${day}T00:00:00.000Z`, accidents }));
}

export default function Accidents() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [district, setDistrict] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [accidentType, setAccidentType] = useState("");
  const [severity, setSeverity] = useState("");
  const data = usePagedData(getAccidents);

  function applyFilters() {
    data.applyFilters({
      ...toUtcDateFilters(from, to),
      ...(district.trim() ? { distrito: district.trim() } : {}),
      ...(districtCode !== "" ? { distrito_cod: Number(districtCode) } : {}),
      ...(accidentType.trim() ? { tipo_accidente: accidentType.trim() } : {}),
      ...(severity.trim() ? { gravedad_max: severity.trim() } : {}),
    });
  }

  function clearFilters() {
    setFrom("");
    setTo("");
    setDistrict("");
    setDistrictCode("");
    setAccidentType("");
    setSeverity("");
    data.clearFilters();
  }

  return (
    <section>
      <p className="eyebrow">Seguridad vial</p>
      <h2>Accidentalidad</h2>
      <p>Explora los incidentes registrados y su distribución diaria.</p>

      <FiltersPanel
        from={from}
        to={to}
        onDateChange={(name, value) => (name === "from" ? setFrom(value) : setTo(value))}
        onApply={applyFilters}
        onClear={clearFilters}
      >
        <FormField
          label="Distrito"
          placeholder="Nombre del distrito"
          value={district}
          onChange={(event) => setDistrict(event.target.value)}
        />
        <FormField
          label="Código de distrito"
          type="number"
          step="1"
          placeholder="Ej. 20"
          value={districtCode}
          onChange={(event) => setDistrictCode(event.target.value)}
        />
        <FormField
          label="Tipo de accidente"
          placeholder="Descripción"
          value={accidentType}
          onChange={(event) => setAccidentType(event.target.value)}
        />
        <FormField
          label="Gravedad máxima"
          placeholder="Valor registrado"
          value={severity}
          onChange={(event) => setSeverity(event.target.value)}
        />
      </FiltersPanel>

      <RequestStatus
        loading={data.loading}
        error={data.error}
        hasRows={data.rows.length > 0}
        onRetry={data.retry}
      />

      {!data.loading && !data.error && (
        <MetricChart
          title="Accidentes por día"
          rows={groupByDay(data.rows)}
          valueKey="accidents"
          kind="bar"
        />
      )}

      <section className="tableSection">
        <div className="tableHeading">
          <h3>Incidentes</h3>
          <span>Datos de la página actual</span>
        </div>
        <ResultsTable columns={columns} rows={data.rows} loading={data.loading} error={data.error} />
        <Pagination pagination={data.pagination} loading={data.loading} onPageChange={data.goToPage} />
      </section>
    </section>
  );
}
