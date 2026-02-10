import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ borderBottom: "2px solid var(--ink)" }} className="bg-[var(--paper)] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl font-black tracking-tight" style={{ color: "var(--ink)" }}>
          <span style={{ color: "var(--accent)" }}>Blog</span>Platforma
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-semibold tracking-wide uppercase hover:text-[var(--accent)] transition-colors">
            Početna
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="text-sm font-semibold tracking-wide uppercase hover:text-[var(--accent)] transition-colors">
                Prijava
              </Link>
              <Link to="/register" className="text-sm font-semibold tracking-wide uppercase px-4 py-2 transition-colors"
                style={{ background: "var(--ink)", color: "var(--paper)" }}>
                Registracija
              </Link>
            </>
          ) : (
            <>
              {user.role === "user" && (
                <Link to="/create-post" className="text-sm font-semibold tracking-wide uppercase hover:text-[var(--accent)] transition-colors">
                  Novi Post
                </Link>
              )}
              {user.role === "admin" && (
                <Link to="/admin" className="text-sm font-semibold tracking-wide uppercase hover:text-[var(--accent)] transition-colors">
                  Admin Panel
                </Link>
              )}
              <span className="text-sm" style={{ color: "var(--muted)" }}>
                Zdravo, <strong>{user.username}</strong>
              </span>
              <button onClick={handleLogout}
                className="text-sm font-semibold tracking-wide uppercase px-4 py-2 border-2 hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
                style={{ borderColor: "var(--ink)" }}>
                Odjava
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};