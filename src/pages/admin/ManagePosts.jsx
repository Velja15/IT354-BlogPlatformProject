import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import styles from "./Admin.module.css";

const ManagePosts = () => {
  const { get, del } = useApi();
  const [posts, setPosts] = useState([]);

  useEffect(() => { get("/posts").then(setPosts); }, []);

  const deletePost = async (id) => {
    if (!window.confirm("Obrisati post?")) return;
    await del(`/posts/${id}`);
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>Postovi ({posts.length})</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Naslov</th>
            <th>Autor</th>
            <th>Kategorija</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id}>
              <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>{p.title}</td>
              <td>{p.authorName}</td>
              <td><span className={`${styles.badge} ${styles.badgeCategory}`}>{p.category}</span></td>
              <td style={{ textAlign: "right" }}>
                <button onClick={() => deletePost(p.id)} className={styles.deleteBtn}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePosts;