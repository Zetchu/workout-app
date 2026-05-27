import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Typography, Badge, colors, spacing, shapes } from '#shared';

export default function ExerciseDetailScreen() {
  const { id, muscle, difficulty, equipment, instructions } =
    useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Typography variant="title" style={styles.title}>{decodeURIComponent(id as string)}</Typography>

      <View style={styles.badgeContainer}>
        <Badge
          label={`Muscle: ${muscle}`}
          backgroundColor={colors.border}
          textColor={colors.textMain}
        />
        <Badge
          label={`Difficulty: ${difficulty}`}
          backgroundColor={colors.border}
          textColor={colors.textMain}
        />
        <Badge
          label={`Equipment: ${equipment}`}
          backgroundColor={colors.border}
          textColor={colors.textMain}
        />
      </View>

      <Typography variant="subtitle" style={styles.subheading}>Instructions</Typography>
      <Typography variant="body" style={styles.instructionsText}>
        {instructions || 'No walkthrough listed.'}
      </Typography>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Typography variant="body" style={styles.backButtonText}>Return to Catalog</Typography>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  title: {
    color: colors.textMain,
    marginBottom: spacing.lg,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  subheading: {
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  instructionsText: {
    color: colors.textMain,
    lineHeight: 24,
    marginBottom: spacing.xxl,
  },
  backButton: {
    backgroundColor: colors.brand,
    padding: spacing.md,
    borderRadius: shapes.radiusMedium,
    alignItems: 'center',
  },
  backButtonText: { color: colors.surface, fontWeight: 'bold' },
});
