import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

import {
  Header,
  Typography,
  colors,
  spacing,
  shapes,
  triggerLightImpact,
  triggerSuccessFeedback,
  useShakeSensor,
} from '#shared';

import ExerciseCard from '../ExerciseCard';
import { useExerciseSearch } from '../../services/useExerciseSearch';
import { fetchExercises, type Exercise } from '../../services/workoutService';

export default function CatalogScreen() {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string>('biceps');

  const { searchQuery, setSearchQuery, filteredExercises } =
    useExerciseSearch(exercises);

  // --- NATIVE SHAKE LOGIC ---
  const handleShakeEvent = useCallback(() => {
    if (filteredExercises.length === 0) return;

    // Select a random exercise from the currently loaded list
    const randomIndex = Math.floor(Math.random() * filteredExercises.length);
    const randomExercise = filteredExercises[randomIndex];

    // Trigger physical vibration
    void triggerSuccessFeedback();

    // Alert user of their random recommendation
    Alert.alert(
      '🏋️ Shake Suggestion!',
      `How about trying: "${randomExercise.name}"?`,
      [
        {
          text: "Let's do it!",
          onPress: () => {
            router.push({
              pathname: `/routine/${encodeURIComponent(randomExercise.name)}`,
              params: {
                muscle: randomExercise.muscle,
                difficulty: randomExercise.difficulty,
                equipment: randomExercise.equipment,
                instructions: randomExercise.instructions,
              },
            });
          },
        },
        { text: 'Roll again', style: 'cancel' },
      ],
    );
  }, [filteredExercises, router]);

  // Hook into accelerometer stream
  useShakeSensor(handleShakeEvent);
  // -------------------------

  const loadData = useCallback(async (muscle: string, isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      const data = await fetchExercises(muscle);
      setExercises(data);
    } catch (error) {
      console.error('Failed to load exercises:', error);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void loadData(selectedMuscle);
  }, [selectedMuscle, loadData]);

  const onRefresh = useCallback(() => {
    void loadData(selectedMuscle, true);
  }, [selectedMuscle, loadData]);

  const onEndReached = useCallback(() => {
    console.log('Reached end of list');
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Exercise }) => (
      <TouchableOpacity
        onPress={() => {
          void triggerLightImpact(); // Add clean haptic response on press
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
    ),
    [router],
  );

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
            onPress={() => {
              void triggerLightImpact(); // Trigger haptic on tab change
              setSelectedMuscle(muscle);
            }}
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

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${selectedMuscle} exercises...`}
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          clearButtonMode='while-editing'
        />
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
        <FlatList
          data={filteredExercises}
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={
            <View>
              <Typography
                variant='label'
                style={styles.sectionTitle}
              >
                Live {selectedMuscle} Catalog ({filteredExercises.length})
              </Typography>
              <Typography
                variant='caption'
                style={styles.shakeTip}
              >
                📱 Shake phone to pick random workout suggestion!
              </Typography>
            </View>
          }
          ListEmptyComponent={
            !loading ? (
              <Typography style={styles.emptyText}>
                No exercises match your search.
              </Typography>
            ) : null
          }
        />
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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: shapes.radiusMedium,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.textMain,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: spacing.xl,
    color: colors.textMuted,
  },
  centerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: spacing.md, color: colors.textMuted },
  scrollArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  sectionTitle: {
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  shakeTip: {
    color: colors.brand,
    fontWeight: '500',
    marginBottom: spacing.md,
  },
});
