import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import styles from "./PostDetail.module.css";

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

  if (loading) return <p style={{ textAlign: "center", padding: "80px", color: "var(--text-muted)" }}>Učitavanje...</p>;
  if (!postData) return null;

  const date = new Date(postData.createdAt).toLocaleDateString("sr-RS", {
    day: "numeric", month: "long", year: "numeric"
  });

  return (
    <div className={styles.page}>
      <button onClick={() => navigate(-1)} className={styles.back}>← Nazad</button>

      <span className={styles.category}>{postData.category}</span>
      <h1 className={styles.title}>{postData.title}</h1>

      <div className={styles.meta}>
        <span>✍ {postData.authorName}</span>
        <span>📅 {date}</span>
      </div>

      <img src={postData.imageUrl} alt={postData.title} className={styles.image} />
      <p className={styles.content}>{postData.content}</p>

      <div className={styles.commentsSection}>
        <h2 className={styles.commentsTitle}>Komentari ({comments.length})</h2>

        {comments.map(c => (
          <div key={c.id} className={styles.comment}>
            <div>
              <p className={styles.commentAuthor}>{c.authorName}</p>
              <p className={styles.commentText}>{c.content}</p>
            </div>
            {(user?.id === c.authorId || user?.role === "admin") && (
              <button onClick={() => deleteComment(c.id)} className={styles.deleteBtn}>Obriši</button>
            )}
          </div>
        ))}

        {user ? (
          <div className={styles.commentForm}>
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Napišite komentar..."
              className={styles.textarea}
            />
            <button onClick={submitComment} className={styles.submitComment}>
              Objavi komentar
            </button>
          </div>
        ) : (
          <p className={styles.loginPrompt}>
            <Link to="/login">Prijavite se</Link> da biste komentarisali.
          </p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;