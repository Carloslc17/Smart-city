import { useAuth } from "../../hooks/useAuth";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <section>
      <h2 className={styles.title}>Hola, {user.username}</h2>
      <p>Aquí irán los KPIs y visualizaciones de la ciudad.</p>
    </section>
  );
}