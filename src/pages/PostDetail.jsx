import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";

const PostDetail = () => {
  const { id } = useParams();
  const { get, post, del } = useApi();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([get(`/posts/${id}`), get(`/comments?postId=${id}`)])
      .then(([p, c]) => { setPostData(p); setComments(c); })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [id]);

  const submitComment = async () => {
    if (!newComment.trim()) return;
    const comment = await post("/comments", {
      postId: Number(id),
      authorId: user.id,
      authorName: user.username,
      content: newComment,
      createdAt: new Date().toISOString(),
    });
    setComments(prev => [...prev, comment]);
    setNewComment("");
  };

  const deleteComment = async (commentId) => {
    await del(`/comments/${commentId}`);
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  if (loading) return <p className="text-center py-20" style={{ color: "var(--muted)" }}>Učitavanje...</p>;
  if (!postData) return null;

  const date = new Date(postData.createdAt).toLocaleDateString("sr-RS", {
    day: "numeric", month: "long", year: "numeric"
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button onClick={() => navigate(-1)}
        className="text-sm font-bold uppercase tracking-wide mb-8 hover:text-[var(--accent)] transition-colors">
        ← Nazad
      </button>

      <span className="text-xs font-bold tracking-widest uppercase px-2 py-1"
        style={{ background: "var(--accent)", color: "white" }}>
        {postData.category}
      </span>

      <h1 className="font-serif text-5xl font-black leading-tight mt-4 mb-4">{postData.title}</h1>

      <div className="flex gap-4 text-sm mb-6 pb-6" style={{ color: "var(--muted)", borderBottom: "2px solid var(--border)" }}>
        <span>✍️ {postData.authorName}</span>
        <span>📅 {date}</span>
      </div>

      <img src={postData.imageUrl} alt={postData.title}
        className="w-full h-64 object-cover mb-8"
        style={{ border: "2px solid var(--border)" }} />

      <div className="text-lg leading-relaxed mb-12" style={{ color: "var(--ink)" }}>
        {postData.content}
      </div>

      {/* Komentari */}
      <div style={{ borderTop: "3px double var(--ink)" }} className="pt-8">
        <h2 className="font-serif text-2xl font-bold mb-6">
          Komentari ({comments.length})
        </h2>

        {comments.map(c => (
          <div key={c.id} className="mb-4 p-4" style={{ border: "1px solid var(--border)", background: "white" }}>
            <div className="flex justify-between items-start">
              <div>
                <strong className="text-sm">{c.authorName}</strong>
                <p className="mt-1">{c.content}</p>
              </div>
              {(user?.id === c.authorId || user?.role === "admin") && (
                <button onClick={() => deleteComment(c.id)}
                  className="text-xs font-bold uppercase ml-4 hover:text-[var(--accent)] transition-colors flex-shrink-0">
                  Obriši
                </button>
              )}
            </div>
          </div>
        ))}

        {user ? (
          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Napišite komentar..."
              rows={3}
              className="w-full px-4 py-3 border-2 outline-none focus:border-[var(--accent)] transition-colors bg-transparent resize-none"
              style={{ borderColor: "var(--ink)", fontFamily: "inherit" }}
            />
            <button onClick={submitComment}
              className="mt-2 px-6 py-2 font-bold text-sm uppercase tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "var(--ink)", color: "var(--paper)" }}>
              Objavi komentar
            </button>
          </div>
        ) : (
          <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
            <a href="/login" className="font-bold underline">Prijavite se</a> da biste komentarisali.
          </p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;