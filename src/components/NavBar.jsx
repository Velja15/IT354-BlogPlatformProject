import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span>Blog</span>Platforma
        </Link>

        <div className={styles.nav}>
          <Link to="/" className={styles.link}>Početna</Link>

          {!user ? (
            <>
              <Link to="/login" className={styles.link}>Prijava</Link>
              <Link to="/register" className={styles.btnPrimary}>Registracija</Link>
            </>
          ) : (
            <>
              {user.role === "user" && (
                <Link to="/create-post" className={styles.link}>+ Novi post</Link>
              )}
              {user.role === "admin" && (
                <Link to="/admin" className={styles.link}>Admin Panel</Link>
              )}
              <span className={styles.userInfo}>Zdravo, <strong>{user.username}</strong></span>
              <button onClick={handleLogout} className={styles.btnOutline}>Odjava</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};