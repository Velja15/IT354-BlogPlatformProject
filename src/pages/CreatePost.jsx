import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { postSchema } from "../utils/validationSchemas";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = ["Programiranje", "Web Dizajn", "Obrazovanje", "Tehnologija", "Ostalo"];

const CreatePost = () => {
  const { post } = useApi();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = async (data) => {
    const newPost = await post("/posts", {
      ...data,
      authorId: user.id,
      authorName: user.username,
      createdAt: new Date().toISOString(),
      imageUrl: `https://picsum.photos/seed/${Date.now()}/800/400`,
    });
    navigate(`/posts/${newPost.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8 pb-6" style={{ borderBottom: "2px solid var(--ink)" }}>
        <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--accent)" }}>
          Novi post
        </p>
        <h1 className="font-serif text-4xl font-black">Napiši post</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide mb-2">Naslov</label>
          <input
            {...register("title")}
            className="w-full px-4 py-3 border-2 outline-none focus:border-[var(--accent)] transition-colors bg-transparent"
            style={{ borderColor: errors.title ? "var(--accent)" : "var(--ink)", fontFamily: "inherit" }}
            placeholder="Naslov vašeg posta..."
          />
          {errors.title && <p className="text-xs mt-1 font-semibold" style={{ color: "var(--accent)" }}>{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-wide mb-2">Kategorija</label>
          <select
            {...register("category")}
            className="w-full px-4 py-3 border-2 outline-none cursor-pointer bg-transparent"
            style={{ borderColor: errors.category ? "var(--accent)" : "var(--ink)", fontFamily: "inherit" }}
          >
            <option value="">-- Odaberite kategoriju --</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <p className="text-xs mt-1 font-semibold" style={{ color: "var(--accent)" }}>{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-wide mb-2">Sadržaj</label>
          <textarea
            {...register("content")}
            rows={8}
            className="w-full px-4 py-3 border-2 outline-none focus:border-[var(--accent)] transition-colors bg-transparent resize-none"
            style={{ borderColor: errors.content ? "var(--accent)" : "var(--ink)", fontFamily: "inherit" }}
            placeholder="Napišite sadržaj vašeg posta..."
          />
          {errors.content && <p className="text-xs mt-1 font-semibold" style={{ color: "var(--accent)" }}>{errors.content.message}</p>}
        </div>

        <button type="submit"
          className="w-full py-3 font-bold text-sm uppercase tracking-widest transition-opacity hover:opacity-80"
          style={{ background: "var(--ink)", color: "var(--paper)" }}>
          Objavi post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;