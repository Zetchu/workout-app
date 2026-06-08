import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

// --- FIXED INTERNAL RELATIVE IMPORTS (NO .js EXTENSIONS) ---
import { colors } from '../../foundations/colors';
import { shapes } from '../../foundations/shapes';

interface CardProps {
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
}

export default function Card({ style, children }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: shapes.radiusLarge,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 8,
  },
});
