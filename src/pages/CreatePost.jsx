import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { postSchema } from "../utils/validationSchemas";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import styles from "./CreatePost.module.css";

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
    <div className={styles.page}>
      <p className={styles.eyebrow}>Novi post</p>
      <h1 className={styles.title}>Napiši post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Naslov</label>
          <input
            {...register("title")}
            className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
            placeholder="Naslov vašeg posta..."
          />
          {errors.title && <span className={styles.error}>{errors.title.message}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Kategorija</label>
          <select
            {...register("category")}
            className={`${styles.select} ${errors.category ? styles.inputError : ""}`}
          >
            <option value="">-- Odaberite kategoriju --</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <span className={styles.error}>{errors.category.message}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Sadržaj</label>
          <textarea
            {...register("content")}
            className={`${styles.textarea} ${errors.content ? styles.inputError : ""}`}
            placeholder="Napišite sadržaj vašeg posta..."
          />
          {errors.content && <span className={styles.error}>{errors.content.message}</span>}
        </div>

        <button type="submit" className={styles.submit}>Objavi post</button>
      </form>
    </div>
  );
};

export default CreatePost;