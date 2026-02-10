import { Link, Outlet, useLocation } from "react-router-dom";

const AdminPanel = () => {
  const location = useLocation();

  const links = [
    { to: "/admin/posts", label: "Postovi" },
    { to: "/admin/users", label: "Korisnici" },
    { to: "/admin/comments", label: "Komentari" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8 pb-6" style={{ borderBottom: "2px solid var(--ink)" }}>
        <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--accent)" }}>
          Administracija
        </p>
        <h1 className="font-serif text-4xl font-black">Admin Panel</h1>
      </div>

      <div className="flex gap-4 mb-8">
        {links.map(l => (
          <Link key={l.to} to={l.to}
            className="px-6 py-2 font-bold text-sm uppercase tracking-wide transition-colors"
            style={{
              background: location.pathname === l.to ? "var(--ink)" : "transparent",
              color: location.pathname === l.to ? "var(--paper)" : "var(--ink)",
              border: "2px solid var(--ink)"
            }}>
            {l.label}
          </Link>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default AdminPanel;