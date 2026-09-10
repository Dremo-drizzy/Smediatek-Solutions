import { useCallback, useEffect, useState } from "react";
import api from "../utils/api";

const usePaginatedResource = (endpoint, limit = 10) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPage = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(endpoint, { params: { page, limit } });
      setItems(res.data.data);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (err) {
      console.error(`❌ Error fetching ${endpoint}:`, err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [endpoint, page, limit]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  const remove = async (id) => {
    await api.delete(`${endpoint}/${id}`);
    setItems((prev) => prev.filter((item) => item._id !== id));
    setTotal((prev) => Math.max(prev - 1, 0));
  };

  return { items, page, setPage, pages, total, loading, error, remove };
};

export default usePaginatedResource;
