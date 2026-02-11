import { Link } from "react-router-dom";
import styles from "./PostCard.module.css";

export const PostCard = ({ post }) => {
  const date = new Date(post.createdAt).toLocaleDateString("sr-RS", {
    day: "numeric", month: "short", year: "numeric"
  });

  return (
    <article className={styles.card}>
      <img src={post.imageUrl} alt={post.title} className={styles.image} />
      <div className={styles.body}>
        <span className={styles.category}>{post.category}</span>
        <Link to={`/posts/${post.id}`}>
          <h2 className={styles.title}>{post.title}</h2>
        </Link>
        <p className={styles.excerpt}>{post.content.substring(0, 110)}...</p>
        <div className={styles.meta}>
          <div className={styles.metaLeft}>
            <span>✍ {post.authorName}</span>
            <span>{date}</span>
          </div>
          <Link to={`/posts/${post.id}`} className={styles.readMore}>
            Čitaj više →
          </Link>
        </div>
      </div>
    </article>
  );
};