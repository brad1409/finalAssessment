import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import RouteCard from '../components/RouteCard';
import { routes, routeGroup } from '../data/routes';
import { colors } from '../theme/colors';

const filters = ['All', 'Taxi', 'Bus/BRT', 'Rail'];
export default function HomeScreen({ navigation }) {
  const [filter, setFilter] = useState('All');
  const [maxFare, setMaxFare] = useState('');
  const visibleRoutes = useMemo(() => routes.filter(route => {
    const matchesMode = filter === 'All' || routeGroup(route.mode) === filter;
    const matchesFare = maxFare.trim() === '' || (Number(maxFare) >= 0 && route.fare <= Number(maxFare));
    return matchesMode && matchesFare;
  }), [filter, maxFare]);
  return (
    <SafeAreaView style={styles.page}>
      <FlatList data={visibleRoutes} keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={<>
          <Text style={styles.eyebrow}>GAUTENG COMMUTER</Text>
          <Text style={styles.heading}>Find your route</Text>
          <Text style={styles.subheading}>Compare everyday trips around Joburg.</Text>
          <Text style={styles.label}>Transport type</Text>
          <View style={styles.filters}>{filters.map(option => <Pressable key={option} onPress={() => setFilter(option)}
            style={[styles.chip, filter === option && styles.activeChip]}>
            <Text style={[styles.chipText, filter === option && styles.activeText]}>{option}</Text>
          </Pressable>)}</View>
          <Text style={styles.label}>Maximum fare (R)</Text>
          <TextInput accessibilityLabel="Maximum fare in rand" value={maxFare}
            onChangeText={value => setMaxFare(value.replace(/[^0-9]/g, ''))}
            keyboardType="number-pad" placeholder="Any amount" placeholderTextColor={colors.muted} style={styles.input} />
          <View style={styles.listHeading}><Text style={styles.label}>Available routes</Text>
            <Text style={styles.count}>{visibleRoutes.length} found</Text></View>
        </>}
        renderItem={({ item }) => <RouteCard route={item} onPress={() => navigation.navigate('RouteDetails', { route: item })} />}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>No routes match</Text>
          <Text style={styles.subheading}>Try another transport type or a higher fare.</Text></View>}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background }, content: { padding: 20, paddingBottom: 32 },
  eyebrow: { fontSize: 11, letterSpacing: 2, fontWeight: '800', color: colors.green, marginTop: 12 },
  heading: { fontSize: 30, fontWeight: '800', color: colors.navy, marginTop: 8 },
  subheading: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 6 },
  label: { fontSize: 14, fontWeight: '700', color: colors.text, marginTop: 26, marginBottom: 10 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderColor: colors.border, paddingHorizontal: 13, paddingVertical: 10, borderRadius: 20, backgroundColor: colors.white },
  activeChip: { backgroundColor: colors.navy, borderColor: colors.navy },
  chipText: { fontSize: 13, color: colors.text, fontWeight: '600' }, activeText: { color: colors.white },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: colors.white, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, color: colors.text },
  listHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  count: { color: colors.muted, fontSize: 13, marginTop: 14 },
  empty: { padding: 24, alignItems: 'center' }, emptyTitle: { color: colors.navy, fontWeight: '700', fontSize: 17 },
});
