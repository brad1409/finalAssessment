import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { formatPrice } from "../utils/basketUtils";

function BasketItemCard({ item, watched, onToggleWatch }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.meta}>{item.store}</Text>
        <Text style={styles.meta}>
          {item.area}, {item.province}
        </Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>

      <TouchableOpacity
        style={[styles.watchBtn, watched && styles.watchBtnActive]}
        onPress={() => onToggleWatch(item.id)}
      >
        <Text style={[styles.watchText, watched && styles.watchTextActive]}>
          {watched ? "Remove" : "Watch"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(BasketItemCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    alignItems: "center",
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "700", color: "#1b1b1b" },
  category: { fontSize: 12, color: "#2e7d32", marginTop: 2, fontWeight: "600" },
  meta: { fontSize: 13, color: "#555", marginTop: 2 },
  price: { fontSize: 18, fontWeight: "700", color: "#0d47a1", marginTop: 6 },
  watchBtn: {
    borderWidth: 1,
    borderColor: "#0d47a1",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  watchBtnActive: { backgroundColor: "#0d47a1" },
  watchText: { color: "#0d47a1", fontWeight: "600" },
  watchTextActive: { color: "#fff" },
});