import styles from "./AuthCard.module.css";

export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <main className={styles.wrapper}>
      <section className={styles.card}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
        {footer && <p className={styles.footer}>{footer}</p>}
      </section>
    </main>
  );
}