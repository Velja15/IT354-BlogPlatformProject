import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";
import styles from "./Admin.module.css";

const ManageUsers = () => {
  const { get, del } = useApi();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => { get("/users").then(setUsers); }, []);

  const deleteUser = async (id) => {
    if (id === currentUser.id) return alert("Ne možete obrisati sebe!");
    if (!window.confirm("Obrisati korisnika?")) return;
    await del(`/users/${id}`);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>Korisnici ({users.length})</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Korisnik</th>
            <th>Email</th>
            <th>Uloga</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td style={{ color: "var(--text-primary)", fontWeight: 600 }}>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <span className={`${styles.badge} ${u.role === "admin" ? styles.badgeAdmin : styles.badgeUser}`}>
                  {u.role}
                </span>
              </td>
              <td style={{ textAlign: "right" }}>
                {u.id !== currentUser.id && (
                  <button onClick={() => deleteUser(u.id)} className={styles.deleteBtn}>Obriši</button>
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