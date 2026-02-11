import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../utils/validationSchemas";
import { useAuth } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";

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

  const Field = ({ name, label, type = "text", placeholder }) => (
    <div>
      <label className="block text-sm font-bold uppercase tracking-wide mb-2">{label}</label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 border-2 outline-none focus:border-[var(--accent)] transition-colors bg-transparent"
        style={{ borderColor: errors[name] ? "var(--accent)" : "var(--ink)", fontFamily: "inherit" }}
      />
      {errors[name] && <p className="text-xs mt-1 font-semibold" style={{ color: "var(--accent)" }}>{errors[name].message}</p>}
    </div>
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 pb-6" style={{ borderBottom: "2px solid var(--ink)" }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--accent)" }}>
            Novi nalog
          </p>
          <h1 className="font-serif text-4xl font-black">Registracija</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Field name="username" label="Korisničko ime" placeholder="vaše_ime" />
          <Field name="email" label="Email" type="email" placeholder="vas@email.com" />
          <Field name="password" label="Lozinka" type="password" placeholder="••••••••" />
          <Field name="confirmPassword" label="Potvrda lozinke" type="password" placeholder="••••••••" />

          <button type="submit"
            className="w-full py-3 font-bold text-sm uppercase tracking-widest transition-opacity hover:opacity-80"
            style={{ background: "var(--ink)", color: "var(--paper)" }}>
            Kreiraj nalog
          </button>
        </form>

        <p className="text-center mt-6 text-sm" style={{ color: "var(--muted)" }}>
          Već imate nalog?{" "}
          <Link to="/login" className="font-bold underline" style={{ color: "var(--ink)" }}>
            Prijavite se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;