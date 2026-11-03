import { useCallback, useEffect, useState } from "react";
import { fetchBasket } from "../services/basketService";
import { loadBasketCache, saveBasketCache } from "../storage/storage";

export default function useBasket() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [cachedAt, setCachedAt] = useState(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const data = await fetchBasket();
      setItems(data);
      setCachedAt(null);
      setStatus("live");
      await saveBasketCache(data);
    } catch (apiError) {
      const cache = await loadBasketCache();
      if (cache) {
        setItems(cache.items);
        setCachedAt(cache.savedAt);
        setStatus("cached");
      } else {
        setItems([]);
        setErrorMessage(apiError.message || "Something went wrong");
        setStatus("error");
      }
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { items, status, errorMessage, cachedAt, reload: load };
}