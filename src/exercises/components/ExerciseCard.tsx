import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Exercise } from '../services/workoutService';
import { Card, Badge, Typography, colors, spacing } from '#shared';

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  // Dynamic color coding based on API Ninjas difficulty values
  const difficultyColor =
    exercise.difficulty === 'expert'
      ? colors.danger
      : exercise.difficulty === 'intermediate'
        ? colors.warning
        : colors.success;

  return (
    <Card style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Typography variant="subtitle" style={styles.exerciseName}>{exercise.name}</Typography>
        <Badge
          label={exercise.difficulty}
          backgroundColor={difficultyColor}
          textColor={colors.surface}
          style={styles.difficultyTag}
        />
      </View>

      <View style={styles.tagsContainer}>
        <Typography variant="caption" style={styles.metaTag}>💪 {exercise.muscle}</Typography>
        <Typography variant="caption" style={styles.metaTag}>⚙️ {exercise.type}</Typography>
      </View>

      <Typography variant="body" style={styles.instructionsTitle}>Instructions:</Typography>
      <Typography
        variant="caption"
        style={styles.instructionsText}
        numberOfLines={3}
      >
        {exercise.instructions}
      </Typography>
    </Card>
  );
};

export default ExerciseCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: spacing.lg,
    marginVertical: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  exerciseName: {
    color: colors.textMain,
    flex: 1,
  },
  difficultyTag: {
    marginLeft: spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  metaTag: {
    color: colors.textMuted,
    marginRight: spacing.lg,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
  },
  instructionsTitle: {
    color: colors.textMain,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  instructionsText: {
    color: colors.textMuted,
    lineHeight: 18,
  },
});
