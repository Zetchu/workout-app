import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

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
  const [selectedMuscle, setSelectedMuscle] = useState<string>('biceps');
  const { searchQuery, setSearchQuery, filteredExercises } =
    useExerciseSearch(exercises);

  // --- NATIVE SHAKE-TO-SUGGEST LOGIC ---
  const handleShakeEvent = useCallback(() => {
    if (filteredExercises.length === 0) return;

    // Pick a random workout from the currently filtered list
    const randomIndex = Math.floor(Math.random() * filteredExercises.length);
    const randomExercise = filteredExercises[randomIndex];

    // Trigger physical success vibration pulse
    void triggerSuccessFeedback();

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

  // Hook into native accelerometer streaming channels
  useShakeSensor(handleShakeEvent);

  // --- API DATA INGESTION LIFECYCLE ---
  useEffect(() => {
    let active = true;
    void (async () => {
      setLoading(true);
      try {
        const data = await fetchExercises(selectedMuscle);
        if (active) setExercises(data);
      } catch (err) {
        console.error('API Ingestion Error:', err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [selectedMuscle]);

  const muscleGroups = [
    { id: 'biceps', label: 'Biceps', icon: 'flame' as const },
    { id: 'chest', label: 'Chest', icon: 'fitness' as const },
    { id: 'lats', label: 'Back', icon: 'body' as const },
    { id: 'quadriceps', label: 'Legs', icon: 'walk' as const },
    { id: 'triceps', label: 'Triceps', icon: 'barbell' as const },
  ];

  return (
    <View style={styles.container}>
      <Header />

      {/* Modern High-Contrast Search Bar */}
      <View style={styles.searchWrapper}>
        <Ionicons
          name='search'
          size={18}
          color={colors.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${selectedMuscle} routines...`}
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          clearButtonMode='while-editing'
        />
      </View>

      {/* Main Routine List Controller */}
      <FlatList
        data={filteredExercises}
        keyExtractor={(item, idx) => `${item.name}-${idx}`}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <View>
            <Typography
              variant='title'
              style={styles.sectionHeader}
            >
              Muscle Targets
            </Typography>

            {/* Premium Scrollable Muscle Selector Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {muscleGroups.map((cat) => {
                const isSelected = selectedMuscle === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryCard,
                      isSelected && styles.activeCategoryCard,
                    ]}
                    onPress={() => {
                      void triggerLightImpact(); // Physical haptic feedback on toggle
                      setSelectedMuscle(cat.id);
                    }}
                  >
                    <Ionicons
                      name={cat.icon}
                      size={20}
                      color={isSelected ? colors.background : colors.brand}
                    />
                    <Typography
                      style={[
                        styles.catLabel,
                        isSelected && styles.activeCatLabel,
                      ]}
                    >
                      {cat.label}
                    </Typography>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Hardware Capability Coach Callout */}
            <View style={styles.tipBox}>
              <Typography
                variant='label'
                style={styles.shakeTip}
              >
                📱 SHAKE YOUR PHONE TO PICK A RANDOM WORKOUT
              </Typography>
            </View>

            <Typography
              variant='title'
              style={[styles.sectionHeader, { marginTop: spacing.md }]}
            >
              Discovered Movements ({filteredExercises.length})
            </Typography>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              void triggerLightImpact(); // Clean tactile tick on item select
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
          loading ? (
            <ActivityIndicator
              size='large'
              color={colors.brand}
              style={styles.loader}
            />
          ) : (
            <Typography style={styles.emptyText}>
              No matching muscle routines found.
            </Typography>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    marginHorizontal: spacing.containerMargin,
    borderRadius: shapes.radiusMedium,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  searchIcon: { marginRight: spacing.base },
  searchInput: { flex: 1, height: 48, color: colors.textMain, fontSize: 14 },
  scrollContent: {
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xl * 2,
  },
  sectionHeader: { marginVertical: spacing.md, fontWeight: '800' },
  categoryScroll: { gap: spacing.sm, paddingRight: spacing.lg },
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: shapes.radiusLarge,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    gap: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 105,
    justifyContent: 'center',
  },
  activeCategoryCard: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  catLabel: { fontWeight: '700', fontSize: 13, color: colors.textMain },
  activeCatLabel: { color: colors.background },
  tipBox: {
    marginTop: spacing.lg,
    backgroundColor: colors.surfaceMuted,
    borderRadius: shapes.radiusSmall,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  shakeTip: {
    color: colors.brand,
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  emptyText: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  loader: { marginTop: spacing.xl * 2 },
});
