import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY = "@mzansi_basket_watch:basket_cache";
const WATCHLIST_KEY = "@mzansi_basket_watch:watchlist";

export async function saveBasketCache(items) {
  try {
    const payload = { savedAt: new Date().toISOString(), items };
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn("Could not save basket cache", e);
  }
}

export async function loadBasketCache() {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (raw === null) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items) || parsed.items.length === 0) {
      return null;
    }
    return parsed;
  } catch (e) {
    console.warn("Could not read basket cache", e);
    return null;
  }
}

export async function loadWatchlist() {
  try {
    const raw = await AsyncStorage.getItem(WATCHLIST_KEY);
    if (raw === null) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Could not read watchlist", e);
    return [];
  }
}

export async function saveWatchlist(ids) {
  try {
    await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(ids));
  } catch (e) {
    console.warn("Could not save watchlist", e);
  }
}