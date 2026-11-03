import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function StatusBanner({ status, cachedAt, onRetry }) {
  if (status === "live") {
    return (
      <View style={[styles.banner, styles.live]}>
        <Text style={styles.text}>Live data</Text>
      </View>
    );
  }

  if (status === "cached") {
    const when = cachedAt ? new Date(cachedAt).toLocaleString() : "earlier";
    return (
      <View style={[styles.banner, styles.cached]}>
        <Text style={styles.text}>
          Offline mode: showing saved data from {when}
        </Text>
        <TouchableOpacity onPress={onRetry}>
          <Text style={styles.retry}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  banner: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  live: { backgroundColor: "#c8e6c9" },
  cached: { backgroundColor: "#ffe0b2" },
  text: { flex: 1, color: "#1b1b1b", fontSize: 13 },
  retry: { color: "#0d47a1", fontWeight: "700", marginLeft: 10 },
});