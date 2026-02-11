import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";

const ManagePosts = () => {
  const { get, del } = useApi();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    get("/posts").then(setPosts);
  }, []);

  const deletePost = async (id) => {
    if (!window.confirm("Obrisati post?")) return;
    await del(`/posts/${id}`);
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold mb-6">Upravljanje postovima ({posts.length})</h2>
      <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--ink)" }}>
            <th className="text-left py-3 font-bold uppercase tracking-wide">Naslov</th>
            <th className="text-left py-3 font-bold uppercase tracking-wide">Autor</th>
            <th className="text-left py-3 font-bold uppercase tracking-wide">Kategorija</th>
            <th className="py-3"></th>
          </tr>
        </thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <td className="py-3 pr-4">{p.title}</td>
              <td className="py-3 pr-4" style={{ color: "var(--muted)" }}>{p.authorName}</td>
              <td className="py-3 pr-4">
                <span className="text-xs px-2 py-1 font-bold" style={{ background: "var(--border)" }}>
                  {p.category}
                </span>
              </td>
              <td className="py-3 text-right">
                <button onClick={() => deletePost(p.id)}
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

export default ManagePosts;