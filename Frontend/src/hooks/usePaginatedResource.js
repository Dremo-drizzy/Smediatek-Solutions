import { useCallback, useEffect, useState } from "react";
import api from "../utils/api";

const usePaginatedResource = (endpoint, limit = 10) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatusValue] = useState("");
  const [search, setSearchValue] = useState("");

  const fetchPage = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page, limit };
      if (status) params.status = status;
      if (search) params.search = search;
      const res = await api.get(endpoint, { params });
      setItems(res.data.data);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (err) {
      console.error(`❌ Error fetching ${endpoint}:`, err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [endpoint, page, limit, status, search]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  const remove = async (id) => {
    await api.delete(`${endpoint}/${id}`);
    setItems((prev) => prev.filter((item) => item._id !== id));
    setTotal((prev) => Math.max(prev - 1, 0));
  };

  const updateStatus = async (id, newStatus) => {
    await api.patch(`${endpoint}/${id}/status`, { status: newStatus });
    setItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
    );
  };

  const setStatus = (value) => {
    setStatusValue(value);
    setPage(1);
  };

  const setSearch = (value) => {
    setSearchValue(value);
    setPage(1);
  };

  return {
    items,
    page,
    setPage,
    pages,
    total,
    loading,
    error,
    remove,
    updateStatus,
    status,
    setStatus,
    search,
    setSearch,
    refetch: fetchPage,
  };
};

export default usePaginatedResource;
