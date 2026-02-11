import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";

const ManageComments = () => {
  const { get, del } = useApi();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    get("/comments").then(setComments);
  }, []);

  const deleteComment = async (id) => {
    if (!window.confirm("Obrisati komentar?")) return;
    await del(`/comments/${id}`);
    setComments(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold mb-6">Upravljanje komentarima ({comments.length})</h2>
      <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--ink)" }}>
            <th className="text-left py-3 font-bold uppercase tracking-wide">Autor</th>
            <th className="text-left py-3 font-bold uppercase tracking-wide">Komentar</th>
            <th className="py-3"></th>
          </tr>
        </thead>
        <tbody>
          {comments.map(c => (
            <tr key={c.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <td className="py-3 pr-4 font-semibold w-32">{c.authorName}</td>
              <td className="py-3 pr-4" style={{ color: "var(--muted)" }}>{c.content}</td>
              <td className="py-3 text-right">
                <button onClick={() => deleteComment(c.id)}
                  className="text-xs font-bold uppercase hover:text-[var(--accent)] transition-colors">
                  Obriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageComments;