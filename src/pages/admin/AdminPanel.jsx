import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./Admin.module.css";

const AdminPanel = () => {
  const location = useLocation();

  const tabs = [
    { to: "/admin/posts", label: "Postovi" },
    { to: "/admin/users", label: "Korisnici" },
    { to: "/admin/comments", label: "Komentari" },
  ];

  return (
    <div className={styles.page}>
      <p className={styles.eyebrow}>Administracija</p>
      <h1 className={styles.pageTitle}>Admin Panel</h1>

      <div className={styles.tabs}>
        {tabs.map(t => (
          <Link
            key={t.to}
            to={t.to}
            className={`${styles.tab} ${location.pathname === t.to ? styles.tabActive : ""}`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default AdminPanel;