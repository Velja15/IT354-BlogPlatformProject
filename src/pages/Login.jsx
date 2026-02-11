import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../utils/validationSchemas";
import { useAuth } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";
import styles from "./Form.module.css";

const Login = () => {
  const { login } = useAuth();
  const { get } = useApi();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const users = await get(`/users?email=${data.email}`);
      const user = users[0];
      if (!user || user.password !== data.password) {
        setError("password", { message: "Pogrešan email ili lozinka" });
        return;
      }
      login(user);
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch {
      setError("password", { message: "Greška pri prijavi" });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Dobrodošli nazad</p>
        <h1 className={styles.title}>Prijava</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="vas@email.com"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Lozinka</label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            />
            {errors.password && <span className={styles.error}>{errors.password.message}</span>}
          </div>

          <button type="submit" className={styles.submit}>Prijavi se</button>
        </form>

        <p className={styles.footer}>
          Nemate nalog? <Link to="/register">Registrujte se</Link>
        </p>

        <div className={styles.hint}>
          <strong>Test nalozi:</strong><br />
          Admin: admin@blog.com / admin123<br />
          Korisnik: marko@email.com / marko123
        </div>
      </div>
    </div>
  );
};

export default Login;