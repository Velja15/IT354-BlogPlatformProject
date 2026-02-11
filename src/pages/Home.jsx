import { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { PostCard } from "../components/PostCard";
import styles from "./Home.module.css";

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
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.heroEyebrow}>Dobrodošli na</p>
        <h1 className={styles.heroTitle}>
          Blog<span>Platforma</span>
        </h1>
        <p className={styles.heroSub}>Čitajte, pišite i delite znanje sa zajednicom.</p>
      </div>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="🔍  Pretraži postove..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select value={category} onChange={e => setCategory(e.target.value)} className={styles.select}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {loading ? (
        <p className={styles.loading}>Učitavanje...</p>
      ) : filtered.length === 0 ? (
        <p className={styles.empty}>Nema postova za zadati filter.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
};

export default Home;