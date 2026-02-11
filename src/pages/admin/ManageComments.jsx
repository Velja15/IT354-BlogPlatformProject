import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import styles from "./Admin.module.css";

const ManageComments = () => {
  const { get, del } = useApi();
  const [comments, setComments] = useState([]);

  useEffect(() => { get("/comments").then(setComments); }, []);

  const deleteComment = async (id) => {
    if (!window.confirm("Obrisati komentar?")) return;
    await del(`/comments/${id}`);
    setComments(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>Komentari ({comments.length})</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Autor</th>
            <th>Komentar</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {comments.map(c => (
            <tr key={c.id}>
              <td style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}>{c.authorName}</td>
              <td>{c.content}</td>
              <td style={{ textAlign: "right" }}>
                <button onClick={() => deleteComment(c.id)} className={styles.deleteBtn}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageComments;