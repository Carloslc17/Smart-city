import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

const areas = [
  {
    title: "Tráfico",
    description: "Consulta mediciones de intensidad y velocidad por punto y periodo.",
    path: "/trafico",
    label: "Abrir tráfico",
  },
  {
    title: "Calidad del aire",
    description: "Explora registros horarios por estación y magnitud.",
    path: "/aire",
    label: "Abrir calidad del aire",
  },
  {
    title: "Seguridad vial",
    description: "Revisa los accidentes registrados y su distribución diaria.",
    path: "/seguridad-vial",
    label: "Abrir seguridad vial",
  },
];

export default function Dashboard() {
  return (
    <section className={styles.home}>
      <p className="eyebrow">Panel de ciudad</p>
      <h2 className={styles.title}>Resumen urbano</h2>
      <p>Elige un área para consultar sus datos y aplicar filtros.</p>
      <div className={styles.cards}>
        {areas.map((area) => (
          <article className={styles.card} key={area.path}>
            <span className={styles.cardAccent} aria-hidden="true" />
            <h3>{area.title}</h3>
            <p>{area.description}</p>
            <Link to={area.path}>{area.label} <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>
    </section>
  );
}