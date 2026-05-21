import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import Header from './Header';
import ExerciseCard from './ExerciseCard';
import { fetchExercises, Exercise } from './workoutService';

const App: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // Defaulting target filter to 'biceps' to load items out of the gate
  const [selectedMuscle, setSelectedMuscle] = useState<string>('biceps');

  // Re-runs the request every single time selectedMuscle changes state
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

      {/* Quick horizontal filter tabs */}
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
            // Combining name and index for a reliable key string
            <ExerciseCard
              key={`${item.name}-${index}`}
              exercise={item}
            />
          ))}
        </ScrollView>
      )}

      <StatusBar style='light' />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
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
  activeFilterTab: {
    backgroundColor: '#0284c7',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
    textTransform: 'capitalize',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#64748b',
    fontSize: 15,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#64748b',
    marginBottom: 10,
  },
});
