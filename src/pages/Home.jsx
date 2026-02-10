import { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { PostCard } from "../components/PostCard";

const CATEGORIES = ["Sve", "Programiranje", "Web Dizajn", "Obrazovanje", "Tehnologija", "Ostalo"];

const Home = () => {
  const { get } = useApi();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Sve");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get("/posts")
      .then(data => setPosts(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter(p => {
    const matchCat = category === "Sve" || p.category === category;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="mb-12 pb-8" style={{ borderBottom: "3px double var(--ink)" }}>
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
          Dobrodošli na
        </p>
        <h1 className="font-serif text-6xl font-black leading-none mb-4" style={{ color: "var(--ink)" }}>
          Blog<br />Platforma
        </h1>
        <p className="text-lg" style={{ color: "var(--muted)" }}>
          Čitajte, pišite i delite znanje.
        </p>
      </div>

      {/* Pretraga i filter */}
      <div className="flex gap-4 mb-10">
        <input
          type="text"
          placeholder="Pretraži postove..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border-2 outline-none focus:border-[var(--accent)] transition-colors bg-transparent"
          style={{ borderColor: "var(--ink)", fontFamily: "inherit" }}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-4 py-2 border-2 outline-none cursor-pointer bg-transparent"
          style={{ borderColor: "var(--ink)", fontFamily: "inherit" }}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Postovi */}
      {loading ? (
        <p className="text-center py-20" style={{ color: "var(--muted)" }}>Učitavanje...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-20" style={{ color: "var(--muted)" }}>Nema postova za zadati filter.</p>
      ) : (
        filtered.map(post => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
};

export default Home;