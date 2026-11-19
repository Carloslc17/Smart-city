import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getErrorMessage } from "../../utils/errors";
import AuthCard from "../../components/AuthCard/AuthCard";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import styles from "./Login.module.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Iniciar sesión"
      subtitle="Accede al panel de Smart City"
      footer={<>¿No tienes cuenta? <Link to="/register">Regístrate</Link></>}
    >
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <FormField label="Email" type="email" name="email" autoComplete="email"
          value={form.email} onChange={handleChange} required />
        <FormField label="Contraseña" type="password" name="password" autoComplete="current-password"
          value={form.password} onChange={handleChange} required />
        {error && <p className={styles.error} role="alert">{error}</p>}
        <Button type="submit" loading={submitting}>Entrar</Button>
      </form>
    </AuthCard>
  );
}