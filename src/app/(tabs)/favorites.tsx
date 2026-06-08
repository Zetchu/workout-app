import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  Header,
  Typography,
  colors,
  spacing,
  triggerLightImpact,
  useFavorites,
} from '#shared';
import ExerciseCard from '../../features/exercises/components/ExerciseCard';

export default function FavoritesTabScreen() {
  const router = useRouter();
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        data={favorites}
        keyExtractor={(item, idx) => `${item.name}-${idx}`}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <View>
            <Typography
              variant='title'
              style={styles.sectionHeader}
            >
              Your Vault ({favorites.length})
            </Typography>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              void triggerLightImpact();
              router.push({
                pathname: `/routine/${encodeURIComponent(item.name)}`,
                params: {
                  muscle: item.muscle,
                  difficulty: item.difficulty,
                  equipment: item.equipment,
                  instructions: item.instructions,
                },
              });
            }}
          >
            <ExerciseCard exercise={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name='heart-dislike-outline'
              size={48}
              color={colors.textMuted}
            />
            <Typography style={styles.emptyText}>
              Your Vault is empty. Tab the heart icon on routines inside the
              Catalog to store items here!
            </Typography>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: {
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xl,
  },
  sectionHeader: { marginVertical: spacing.md, fontWeight: '800' },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl * 2,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  emptyText: {
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 14,
  },
});
