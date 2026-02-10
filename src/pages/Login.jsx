import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../utils/validationSchemas";
import { useAuth } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";

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
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 pb-6" style={{ borderBottom: "2px solid var(--ink)" }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--accent)" }}>
            Dobrodošli nazad
          </p>
          <h1 className="font-serif text-4xl font-black">Prijava</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wide mb-2">Email</label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-3 border-2 outline-none focus:border-[var(--accent)] transition-colors bg-transparent"
              style={{ borderColor: errors.email ? "var(--accent)" : "var(--ink)", fontFamily: "inherit" }}
              placeholder="vas@email.com"
            />
            {errors.email && <p className="text-xs mt-1 font-semibold" style={{ color: "var(--accent)" }}>{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wide mb-2">Lozinka</label>
            <input
              {...register("password")}
              type="password"
              className="w-full px-4 py-3 border-2 outline-none focus:border-[var(--accent)] transition-colors bg-transparent"
              style={{ borderColor: errors.password ? "var(--accent)" : "var(--ink)", fontFamily: "inherit" }}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-xs mt-1 font-semibold" style={{ color: "var(--accent)" }}>{errors.password.message}</p>}
          </div>

          <button type="submit"
            className="w-full py-3 font-bold text-sm uppercase tracking-widest transition-opacity hover:opacity-80"
            style={{ background: "var(--ink)", color: "var(--paper)" }}>
            Prijavi se
          </button>
        </form>

        <p className="text-center mt-6 text-sm" style={{ color: "var(--muted)" }}>
          Nemate nalog?{" "}
          <Link to="/register" className="font-bold underline" style={{ color: "var(--ink)" }}>
            Registrujte se
          </Link>
        </p>

        <div className="mt-8 p-4 text-xs" style={{ background: "var(--border)", color: "var(--muted)" }}>
          <strong>Test nalozi:</strong><br />
          Admin: admin@blog.com / admin123<br />
          Korisnik: marko@email.com / marko123
        </div>
      </div>
    </div>
  );
};

export default Login;