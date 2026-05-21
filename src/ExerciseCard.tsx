import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Exercise } from './workoutService';

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  // Dynamic color coding based on API Ninjas difficulty values
  const difficultyColor =
    exercise.difficulty === 'expert'
      ? '#ef4444'
      : exercise.difficulty === 'intermediate'
        ? '#f59e0b'
        : '#10b981';

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={[styles.difficultyTag, { color: difficultyColor }]}>
          {exercise.difficulty}
        </Text>
      </View>

      <View style={styles.tagsContainer}>
        <Text style={styles.metaTag}>💪 {exercise.muscle}</Text>
        <Text style={styles.metaTag}>⚙️ {exercise.type}</Text>
      </View>

      <Text style={styles.instructionsTitle}>Instructions:</Text>
      <Text
        style={styles.instructionsText}
        numberOfLines={3}
      >
        {exercise.instructions}
      </Text>
    </View>
  );
};

export default ExerciseCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
  },
  difficultyTag: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaTag: {
    fontSize: 13,
    color: '#64748b',
    marginRight: 16,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    textTransform: 'capitalize',
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  instructionsText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
});
