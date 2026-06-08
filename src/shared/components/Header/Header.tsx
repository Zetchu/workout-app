// src/shared/components/Header/Header.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Typography from '../../design/elements/Typography';
import RestTimer from '../RestTimer'; // Import our brand new component
import { colors } from '../../design/foundations/colors';
import { spacing } from '../../design/foundations/spacing';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.brandRow}>
        <Ionicons
          name='flash'
          size={22}
          color={colors.brand}
        />
        <Typography
          variant='title'
          style={styles.brandText}
        >
          FORGE FITNESS
        </Typography>
      </View>

      {/* RENDER CLEAN INDEPENDENT TIMER MODULE */}
      <RestTimer />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xl + 10,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.containerMargin,
    backgroundColor: colors.background,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  brandText: {
    color: colors.brand,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
});
