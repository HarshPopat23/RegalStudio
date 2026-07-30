import { useCallback, useEffect, useState } from "react";
import { getCategories, getProducts } from "../services/catalogService";

export function useStore() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [nextCategories, nextProducts] = await Promise.all([
        getCategories(),
        getProducts(),
      ]);
      setCategories(nextCategories);
      setProducts(nextProducts);
    } catch (requestError) {
      setError(requestError.message || "Unable to load the catalog.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { categories, products, loading, error, refresh };
}
