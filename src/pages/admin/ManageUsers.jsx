import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";

const ManageUsers = () => {
  const { get, del } = useApi();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    get("/users").then(setUsers);
  }, []);

  const deleteUser = async (id) => {
    if (id === currentUser.id) return alert("Ne možete obrisati sebe!");
    if (!window.confirm("Obrisati korisnika?")) return;
    await del(`/users/${id}`);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold mb-6">Upravljanje korisnicima ({users.length})</h2>
      <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--ink)" }}>
            <th className="text-left py-3 font-bold uppercase tracking-wide">Korisnik</th>
            <th className="text-left py-3 font-bold uppercase tracking-wide">Email</th>
            <th className="text-left py-3 font-bold uppercase tracking-wide">Uloga</th>
            <th className="py-3"></th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <td className="py-3 pr-4 font-semibold">{u.username}</td>
              <td className="py-3 pr-4" style={{ color: "var(--muted)" }}>{u.email}</td>
              <td className="py-3 pr-4">
                <span className="text-xs px-2 py-1 font-bold"
                  style={{ background: u.role === "admin" ? "var(--accent)" : "var(--border)", color: u.role === "admin" ? "white" : "var(--ink)" }}>
                  {u.role}
                </span>
              </td>
              <td className="py-3 text-right">
                {u.id !== currentUser.id && (
                  <button onClick={() => deleteUser(u.id)}
                    className="text-xs font-bold uppercase hover:text-[var(--accent)] transition-colors">
                    Obriši
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;