import { Link } from "react-router-dom";

export const PostCard = ({ post }) => {
  const date = new Date(post.createdAt).toLocaleDateString("sr-RS", {
    day: "numeric", month: "long", year: "numeric"
  });

  return (
    <article className="group border-b-2 pb-8 mb-8" style={{ borderColor: "var(--border)" }}>
      <div className="flex gap-6">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-48 h-32 object-cover flex-shrink-0"
          style={{ border: "2px solid var(--border)" }}
        />
        <div className="flex flex-col justify-between flex-1">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase px-2 py-1 mr-3"
              style={{ background: "var(--accent)", color: "white" }}>
              {post.category}
            </span>
            <Link to={`/posts/${post.id}`}>
              <h2 className="font-serif text-2xl font-bold mt-3 group-hover:text-[var(--accent)] transition-colors leading-tight">
                {post.title}
              </h2>
            </Link>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {post.content.substring(0, 120)}...
            </p>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs" style={{ color: "var(--muted)" }}>
            <span>✍️ {post.authorName}</span>
            <span>📅 {date}</span>
            <Link to={`/posts/${post.id}`}
              className="ml-auto font-bold uppercase tracking-wide text-xs hover:text-[var(--accent)] transition-colors">
              Čitaj više →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};