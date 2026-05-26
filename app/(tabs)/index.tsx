import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

import Header from '../../src/components/Header';
import ExerciseCard from '../../src/components/ExerciseCard';
import { fetchExercises, Exercise } from '../../src/services/workoutService';

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

  const muscleGroups = ['biceps', 'chest', 'back', 'quadriceps'];

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
            <Text
              style={[
                styles.filterText,
                selectedMuscle === muscle && styles.activeFilterText,
              ]}
            >
              {muscle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size='large'
            color='#0284c7'
          />
          <Text style={styles.loadingText}>Fetching dynamic routine...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.sectionTitle}>
            Live {selectedMuscle} Catalog ({exercises.length})
          </Text>

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
  container: { flex: 1, backgroundColor: '#f8fafc' },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  activeFilterTab: { backgroundColor: '#0284c7' },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
    textTransform: 'capitalize',
  },
  activeFilterText: { color: '#ffffff' },
  centerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 12, color: '#64748b', fontSize: 15 },
  scrollArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingVertical: 16 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#64748b',
    marginBottom: 10,
  },
});
