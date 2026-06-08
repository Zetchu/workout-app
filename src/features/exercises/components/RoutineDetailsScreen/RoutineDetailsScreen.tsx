import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Header, Typography, Card, colors, spacing, shapes } from '#shared';

export default function RoutineDetailsScreen() {
  const router = useRouter();
  const { id, muscle, difficulty, equipment, instructions } =
    useLocalSearchParams<{
      id: string;
      muscle: string;
      difficulty: string;
      equipment: string;
      instructions: string;
    }>();

  return (
    <View style={styles.container}>
      <Header title={id ? decodeURIComponent(id) : 'Exercise Details'} />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.card}>
          <Typography
            variant='label'
            style={styles.sectionTitle}
          >
            Target Domain
          </Typography>
          <Typography
            variant='body'
            style={styles.valueText}
          >
            Muscle Group:{' '}
            <Typography style={styles.capitalize}>{muscle}</Typography>
          </Typography>
          <Typography
            variant='body'
            style={styles.valueText}
          >
            Difficulty:{' '}
            <Typography style={styles.capitalize}>{difficulty}</Typography>
          </Typography>
          <Typography
            variant='body'
            style={styles.valueText}
          >
            Equipment:{' '}
            <Typography style={styles.capitalize}>
              {equipment || 'None'}
            </Typography>
          </Typography>
        </Card>

        <Card style={styles.card}>
          <Typography
            variant='label'
            style={styles.sectionTitle}
          >
            Execution Instructions
          </Typography>
          <Typography
            variant='body'
            style={styles.instructionsText}
          >
            {instructions || 'No execution instructions provided.'}
          </Typography>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  card: {
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.brand,
    marginBottom: spacing.sm,
  },
  valueText: {
    color: colors.textMain,
    marginVertical: spacing.xs / 2,
  },
  capitalize: {
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  instructionsText: {
    color: colors.textMain,
    lineHeight: 22,
  },
});
