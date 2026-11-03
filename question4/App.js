
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReportCard from './components/ReportCard';

const STORAGE_KEY = '@munifix_reports';

const INITIAL_REPORTS = [
  {
    id: 'R001',
    category: 'Pothole',
    locationText: 'Bree Street, Johannesburg',
    description: 'Large pothole near the pedestrian crossing.',
    resolved: false,
  },
  {
    id: 'R002',
    category: 'Broken streetlight',
    locationText: 'Empire Road, Parktown',
    description: 'Streetlight has not been working for several nights.',
    resolved: false,
  },
  {
    id: 'R003',
    category: 'Water leak',
    locationText: 'Main Road, Melville',
    description: 'Water is leaking onto the pavement.',
    resolved: true,
  },
  {
    id: 'R004',
    category: 'Pothole',
    locationText: 'Smit Street, Braamfontein',
    description: 'Road surface damaged near the intersection.',
    resolved: false,
  },
];

export default function App() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [loaded, setLoaded] = useState(false);

  // Restore reports from local storage.
  useEffect(() => {
    async function loadReports() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setReports(parsed);
          }
        }
      } catch (error) {
        console.warn('Error loading reports:', error);
      } finally {
        setLoaded(true);
      }
    }

    loadReports();
  }, []);

  // Save changes after the initial load.
  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(reports)
    ).catch(error => {
      console.warn('Error saving reports:', error);
    });
  }, [reports, loaded]);

  // Q4.1: Immutable state update.
  function toggleResolved(id) {
    setReports(previous =>
      previous.map(report =>
        report.id === id
          ? { ...report, resolved: !report.resolved }
          : report
      )
    );
  }

  // Q4.2: Counter derived from current state.
  const openCount = reports.filter(
    report => !report.resolved
  ).length;

  if (!loaded) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#1D4ED8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <FlatList
        data={reports}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ReportCard
            report={item}
            onToggle={toggleResolved}
          />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>MuniFix SA</Text>
            <Text style={styles.subtitle}>
              Municipal service reports
            </Text>

            <View style={styles.summary}>
              <Text style={styles.summaryLabel}>
                Open reports
              </Text>
              <Text style={styles.count}>
                {openCount}
              </Text>
              <Text style={styles.total}>
                {reports.length} total reports
              </Text>
            </View>

            <Text style={styles.heading}>
              Recent reports
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text>No reports available.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  list: {
    padding: 18,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#12315B',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 5,
  },
  summary: {
    backgroundColor: '#E7EFFC',
    padding: 20,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 24,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#27466B',
    fontWeight: '600',
  },
  count: {
    fontSize: 42,
    fontWeight: '800',
    color: '#153B74',
  },
  total: {
    color: '#536C8A',
    fontSize: 13,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#172B49',
    marginBottom: 12,
  },
});
