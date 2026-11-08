import { useId } from "react";
import styles from "./FormField.module.css";

export default function FormField({ label, error, ...inputProps }) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input id={id} className={styles.input} aria-invalid={!!error} {...inputProps} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}