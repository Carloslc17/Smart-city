import { useEffect, useState } from "react";
import { getErrorMessage } from "../utils/errors";

const PAGE_SIZE = 20;

export default function usePagedData(fetchPage) {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPage() {
      setLoading(true);
      setError("");
      setResult(null);

      try {
        const response = await fetchPage(
          { ...filters, page, limit: PAGE_SIZE },
          controller.signal,
        );
        if (!controller.signal.aborted) setResult(response);
      } catch (requestError) {
        if (!controller.signal.aborted) setError(getErrorMessage(requestError));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadPage();
    return () => controller.abort();
  }, [fetchPage, filters, page, retryCount]);

  function applyFilters(nextFilters) {
    setPage(1);
    setFilters(nextFilters);
  }

  function clearFilters() {
    setPage(1);
    setFilters({});
  }

  return {
    rows: result?.data ?? [],
    pagination: result?.pagination,
    filters,
    page,
    loading,
    error,
    applyFilters,
    clearFilters,
    goToPage: setPage,
    retry: () => setRetryCount((count) => count + 1),
  };
}
