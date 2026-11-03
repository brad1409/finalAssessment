import { useCallback, useEffect, useState } from "react";
import { loadWatchlist, saveWatchlist } from "../storage/storage";

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    loadWatchlist().then((ids) => {
      if (active) {
        setWatchlist(ids);
        setReady(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (ready) saveWatchlist(watchlist);
  }, [watchlist, ready]);

  const toggleWatch = useCallback((id) => {
    setWatchlist((current) =>
      current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id]
    );
  }, []);

  return { watchlist, toggleWatch };
}