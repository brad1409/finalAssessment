import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function RouteCard({ route, onPress }) {
  const delayed = route.status === 'Delayed';
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`View ${route.mode} from ${route.from} to ${route.to}`}
      onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.top}>
        <Text style={styles.mode}>{route.mode}</Text>
        <Text style={styles.fare}>R{route.fare}</Text>
      </View>
      <Text style={styles.route}>{route.from}  →  {route.to}</Text>
      <View style={styles.bottom}>
        <View style={[styles.status, delayed ? styles.delayed : styles.operating]}>
          <View style={[styles.dot, { backgroundColor: delayed ? colors.amber : colors.green }]} />
          <Text style={[styles.statusText, { color: delayed ? colors.amber : colors.green }]}>{route.status}</Text>
        </View>
        <Text style={styles.details}>View details  ›</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: colors.border, marginBottom: 12 },
  pressed: { opacity: 0.75 }, top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mode: { fontSize: 14, fontWeight: '700', color: colors.navy }, fare: { fontSize: 18, fontWeight: '800', color: colors.text },
  route: { fontSize: 15, color: colors.text, marginTop: 12, marginBottom: 16, lineHeight: 22 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  status: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  operating: { backgroundColor: colors.paleGreen }, delayed: { backgroundColor: colors.paleAmber },
  dot: { width: 7, height: 7, borderRadius: 4, marginRight: 6 }, statusText: { fontSize: 12, fontWeight: '700' },
  details: { fontSize: 13, color: colors.green, fontWeight: '700' },
});
