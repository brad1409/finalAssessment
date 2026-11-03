
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ReportCard({ report, onToggle }) {
  // Q4.1: Animated values survive re-renders.
  const fade = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;

  // Q4.2: Fade in and move upward on mount.
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, translateY]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fade,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.category}>
          {report.category}
        </Text>

        <View
          style={[
            styles.badge,
            report.resolved
              ? styles.resolvedBadge
              : styles.openBadge,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              report.resolved
                ? styles.resolvedText
                : styles.openText,
            ]}
          >
            {report.resolved ? 'Resolved' : 'Open'}
          </Text>
        </View>
      </View>

      <Text style={styles.location}>
        {report.locationText}
      </Text>

      <Text style={styles.description}>
        {report.description}
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => onToggle(report.id)}
        style={({ pressed }) => [
          styles.button,
          report.resolved
            ? styles.reopenButton
            : styles.resolveButton,
          pressed && { opacity: 0.7 },
        ]}
      >
        <Text style={styles.buttonText}>
          {report.resolved
            ? 'Reopen report'
            : 'Mark as resolved'}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: '700',
    color: '#162B49',
    flexShrink: 1,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  openBadge: {
    backgroundColor: '#FFF2D8',
  },
  resolvedBadge: {
    backgroundColor: '#DCFCE7',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  openText: {
    color: '#935900',
  },
  resolvedText: {
    color: '#166534',
  },
  location: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#334155',
    marginTop: 7,
    lineHeight: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  resolveButton: {
    backgroundColor: '#1D4ED8',
  },
  reopenButton: {
    backgroundColor: '#475569',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
