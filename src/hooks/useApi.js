const BASE_URL = "http://localhost:3001";

export const useApi = () => {
  const get = async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error("Greška pri učitavanju podataka");
    return res.json();
  };

  const post = async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Greška pri kreiranju");
    return res.json();
  };

  const put = async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Greška pri ažuriranju");
    return res.json();
  };

  const del = async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Greška pri brisanju");
    return res.json();
  };

  return { get, post, put, del };
};