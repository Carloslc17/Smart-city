import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getErrorMessage } from "../../utils/errors";
import AuthCard from "../../components/AuthCard/AuthCard";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import styles from "./Register.module.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres");
    if (form.password !== form.confirm) return setError("Las contraseñas no coinciden");

    setSubmitting(true);
    try {
      const { name, email, password } = form;
      await register({ name, email, password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Crear cuenta"
      footer={<>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></>}
    >
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <FormField label="Nombre" name="name" autoComplete="name"
          value={form.name} onChange={handleChange} required />
        <FormField label="Email" type="email" name="email" autoComplete="email"
          value={form.email} onChange={handleChange} required />
        <FormField label="Contraseña" type="password" name="password" autoComplete="new-password"
          value={form.password} onChange={handleChange} required />
        <FormField label="Repite la contraseña" type="password" name="confirm" autoComplete="new-password"
          value={form.confirm} onChange={handleChange} required />
        {error && <p className={styles.error} role="alert">{error}</p>}
        <Button type="submit" loading={submitting}>Registrarme</Button>
      </form>
    </AuthCard>
  );
}