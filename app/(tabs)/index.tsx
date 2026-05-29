import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

import { Header, Typography, colors, spacing, shapes } from '#shared';
import { ExerciseCard, fetchExercises, type Exercise } from '#exercises';

export default function CatalogScreen() {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMuscle, setSelectedMuscle] = useState<string>('biceps');

  useEffect(() => {
    void (async () => {
      setLoading(true);
      try {
        const data = await fetchExercises(selectedMuscle);
        setExercises(data);
      } catch (error) {
        console.error('Failed to load exercises from API Ninjas:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedMuscle]);

  const muscleGroups = ['biceps', 'chest', 'quadriceps'];

  return (
    <View style={styles.container}>
      <Header title='Reps & Routines' />

      <View style={styles.filterBar}>
        {muscleGroups.map((muscle) => (
          <TouchableOpacity
            key={muscle}
            style={[
              styles.filterTab,
              selectedMuscle === muscle && styles.activeFilterTab,
            ]}
            onPress={() => setSelectedMuscle(muscle)}
          >
            <Typography
              variant='caption'
              style={[
                styles.filterText,
                selectedMuscle === muscle && styles.activeFilterText,
              ]}
            >
              {muscle}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size='large'
            color={colors.brand}
          />
          <Typography
            variant='body'
            style={styles.loadingText}
          >
            Fetching dynamic routine...
          </Typography>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
        >
          <Typography
            variant='label'
            style={styles.sectionTitle}
          >
            Live {selectedMuscle} Catalog ({exercises.length})
          </Typography>

          {exercises.map((item, index) => (
            <TouchableOpacity
              key={`${item.name}-${index}`}
              onPress={() => {
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
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: shapes.radiusPill,
    backgroundColor: colors.surfaceMuted,
  },
  activeFilterTab: { backgroundColor: colors.brand },
  filterText: {
    fontWeight: '500',
    color: colors.textMuted,
    textTransform: 'capitalize',
  },
  activeFilterText: { color: colors.surface },
  centerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: spacing.md, color: colors.textMuted },
  scrollArea: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingVertical: spacing.lg },
  sectionTitle: {
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
});
