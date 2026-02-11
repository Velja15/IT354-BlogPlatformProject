import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../utils/validationSchemas";
import { useAuth } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";
import styles from "./Form.module.css";

const Register = () => {
  const { login } = useAuth();
  const { get, post } = useApi();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const existing = await get(`/users?email=${data.email}`);
      if (existing.length > 0) {
        setError("email", { message: "Ovaj email je već registrovan" });
        return;
      }
      const newUser = await post("/users", {
        username: data.username,
        email: data.email,
        password: data.password,
        role: "user",
      });
      login(newUser);
      navigate("/");
    } catch {
      setError("email", { message: "Greška pri registraciji" });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Novi nalog</p>
        <h1 className={styles.title}>Registracija</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {[
            { name: "username", label: "Korisničko ime", type: "text", placeholder: "vase_ime" },
            { name: "email", label: "Email", type: "email", placeholder: "vas@email.com" },
            { name: "password", label: "Lozinka", type: "password", placeholder: "••••••••" },
            { name: "confirmPassword", label: "Potvrda lozinke", type: "password", placeholder: "••••••••" },
          ].map(f => (
            <div key={f.name} className={styles.field}>
              <label className={styles.label}>{f.label}</label>
              <input
                {...register(f.name)}
                type={f.type}
                placeholder={f.placeholder}
                className={`${styles.input} ${errors[f.name] ? styles.inputError : ""}`}
              />
              {errors[f.name] && <span className={styles.error}>{errors[f.name].message}</span>}
            </div>
          ))}

          <button type="submit" className={styles.submit}>Kreiraj nalog</button>
        </form>

        <p className={styles.footer}>
          Već imate nalog? <Link to="/login">Prijavite se</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;