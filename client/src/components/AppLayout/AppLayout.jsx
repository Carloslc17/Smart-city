import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../Button/Button";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  const { user, logout } = useAuth();
  return (
    <div className={styles.shell}>
      <header className={styles.navbar}>
        <div className={styles.brandGroup}>
          <strong>Smart City</strong>
          <nav className={styles.navigation} aria-label="Navegación principal">
            <NavLink to="/" end>Resumen</NavLink>
            <NavLink to="/trafico">Tráfico</NavLink>
            <NavLink to="/aire">Aire</NavLink>
            <NavLink to="/seguridad-vial">Seguridad vial</NavLink>
          </nav>
        </div>
        <div className={styles.right}>
          <span>{user.username}</span>
          <Button variant="ghost" onClick={logout}>Salir</Button>
        </div>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}