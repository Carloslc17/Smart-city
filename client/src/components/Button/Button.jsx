import styles from "./Button.module.css";

export default function Button({ loading = false, variant = "primary", children, ...props }) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Procesando…" : children}
    </button>
  );
}