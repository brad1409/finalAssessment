import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import useBasket from "./src/hooks/useBasket";
import useWatchlist from "./src/hooks/useWatchlist";
import BasketItemCard from "./src/components/BasketItemCard";
import StatusBanner from "./src/components/StatusBanner";
import {
  filterItems,
  getCategories,
  getStats,
  formatPrice,
} from "./src/utils/basketUtils";

export default function App() {
  const { items, status, errorMessage, cachedAt, reload } = useBasket();
  const { watchlist, toggleWatch } = useWatchlist();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);

  const categories = useMemo(() => getCategories(items), [items]);

  const visible = useMemo(() => {
    let result = filterItems(items, { query, category, maxPrice });
    if (showWatchlistOnly) result = result.filter((i) => watchlist.includes(i.id));
    return result;
  }, [items, query, category, maxPrice, showWatchlistOnly, watchlist]);

  const { count, average } = getStats(visible);

  if (status === "loading") {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#0d47a1" />
        <Text style={styles.stateText}>Loading basket prices...</Text>
      </SafeAreaView>
    );
  }

  if (status === "error") {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorTitle}>Could not load prices</Text>
        <Text style={styles.stateText}>
          No internet and no saved data available.
        </Text>
        <Text style={styles.errorDetail}>{errorMessage}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={reload}>
          <Text style={styles.retryText}>Try again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mzansi Basket Watch</Text>

      <StatusBanner status={status} cachedAt={cachedAt} onRetry={reload} />

      <TextInput
        style={styles.input}
        placeholder="Search by name..."
        value={query}
        onChangeText={setQuery}
      />
      <TextInput
        style={styles.input}
        placeholder="Max price (R)"
        keyboardType="numeric"
        value={maxPrice}
        onChangeText={setMaxPrice}
      />

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.chip, category === c && styles.chipActive]}
              onPress={() => setCategory(c)}
            >
              <Text style={[styles.chipText, category === c && styles.chipTextActive]}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summary}>
          {count} result{count === 1 ? "" : "s"} | Avg: {formatPrice(average)}
        </Text>
        <TouchableOpacity onPress={() => setShowWatchlistOnly((v) => !v)}>
          <Text style={styles.link}>
            {showWatchlistOnly ? "Show all" : `Watchlist (${watchlist.length})`}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BasketItemCard
            item={item}
            watched={watchlist.includes(item.id)}
            onToggleWatch={toggleWatch}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.stateText}>
              {showWatchlistOnly
                ? "Your watchlist is empty."
                : "No items match your search or filters."}
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f4f7", padding: 14 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f2f4f7",
  },
  title: { fontSize: 24, fontWeight: "800", color: "#0d47a1", marginBottom: 10 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: "#0d47a1" },
  chipText: { color: "#333" },
  chipTextActive: { color: "#fff", fontWeight: "700" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  summary: { fontWeight: "600", color: "#333" },
  link: { color: "#0d47a1", fontWeight: "700" },
  empty: { alignItems: "center", marginTop: 40 },
  stateText: { marginTop: 10, color: "#555", textAlign: "center" },
  errorTitle: { fontSize: 20, fontWeight: "700", color: "#b71c1c" },
  errorDetail: { marginTop: 6, color: "#999", fontSize: 12 },
  retryBtn: {
    marginTop: 16,
    backgroundColor: "#0d47a1",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryText: { color: "#fff", fontWeight: "700" },
});