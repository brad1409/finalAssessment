import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import { colors } from '../theme/colors';

export default function RouteDetailsScreen({ route, navigation }) {
  const selected = route.params.route;
  return <SafeAreaView style={styles.page}><ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.eyebrow}>{selected.mode.toUpperCase()}</Text>
    <Text style={styles.title}>{selected.from} → {selected.to}</Text>
    <View style={styles.panel}>
      <Info label="From" value={selected.from} />
      <Info label="To" value={selected.to} />
      <Info label="Fare" value={`R${selected.fare}`} />
      <Info label="Service status" value={selected.status} highlight={selected.status === 'Delayed'} />
      <Info label="Route ID" value={selected.id} last />
    </View>
    {selected.status === 'Delayed' && <Text style={styles.warning}>This service is marked as delayed. Allow extra time for your trip.</Text>}
    <Text style={styles.help}>Something wrong with this route?</Text>
    <Pressable style={styles.button} onPress={() => navigation.navigate('ReportIssue', { routeId: selected.id, routeName: `${selected.from} → ${selected.to}` })}>
      <Text style={styles.buttonText}>Report a problem</Text>
    </Pressable>
  </ScrollView></SafeAreaView>;
}
function Info({ label, value, highlight, last }) {
  return <View style={[styles.info, last && { borderBottomWidth: 0 }]}>
    <Text style={styles.infoLabel}>{label}</Text><Text style={[styles.infoValue, highlight && { color: colors.amber }]}>{value}</Text>
  </View>;
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background }, content: { padding: 20 },
  eyebrow: { fontSize: 12, color: colors.green, fontWeight: '800', letterSpacing: 1.5, marginTop: 14 },
  title: { fontSize: 27, color: colors.navy, fontWeight: '800', marginTop: 12, marginBottom: 22, lineHeight: 35 },
  panel: { backgroundColor: colors.white, borderRadius: 14, paddingHorizontal: 16, borderWidth: 1, borderColor: colors.border },
  info: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: colors.border, gap: 10 },
  infoLabel: { color: colors.muted, fontSize: 14 }, infoValue: { color: colors.text, fontWeight: '700', fontSize: 14, textAlign: 'right', flexShrink: 1 },
  warning: { backgroundColor: colors.paleAmber, color: colors.amber, padding: 14, borderRadius: 10, marginTop: 16, lineHeight: 21 },
  help: { color: colors.text, fontWeight: '700', marginTop: 32, marginBottom: 12, fontSize: 16 },
  button: { backgroundColor: colors.navy, borderRadius: 12, padding: 16, alignItems: 'center' },
  buttonText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
