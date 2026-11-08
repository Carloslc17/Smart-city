import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../Button/Button";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  const { user, logout } = useAuth();
  return (
    <div className={styles.shell}>
      <header className={styles.navbar}>
        <strong>Smart City</strong>
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