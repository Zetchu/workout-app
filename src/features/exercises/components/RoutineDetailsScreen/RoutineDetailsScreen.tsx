import { StyleSheet, View, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Header, Typography, Card, colors, spacing } from "#shared";

export default function RoutineDetailsScreen() {
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
      <Header />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
      >
        <Typography variant="display" style={styles.mainTitle}>
          {id ? decodeURIComponent(id) : "Exercise Details"}
        </Typography>

        <Card style={styles.card}>
          <Typography variant="label" style={styles.sectionTitle}>
            TARGET DOMAIN
          </Typography>
          <View style={styles.divider} />

          <Typography variant="body" style={styles.valueText}>
            Muscle Group:{" "}
            <Typography style={styles.capitalize}>{muscle}</Typography>
          </Typography>
          <Typography variant="body" style={styles.valueText}>
            Difficulty:{" "}
            <Typography style={styles.capitalize}>{difficulty}</Typography>
          </Typography>
          <Typography variant="body" style={styles.valueText}>
            Equipment:{" "}
            <Typography style={styles.capitalize}>
              {equipment || "None"}
            </Typography>
          </Typography>
        </Card>

        <Card style={styles.card}>
          <Typography variant="label" style={styles.sectionTitle}>
            EXECUTION INSTRUCTIONS
          </Typography>
          <View style={styles.divider} />

          <Typography variant="body" style={styles.instructionsText}>
            {instructions || "No execution instructions provided."}
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
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  mainTitle: {
    fontWeight: "900",
    color: colors.textMain,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  card: {
    padding: 20,
  },
  sectionTitle: {
    color: colors.brand,
    fontWeight: "800",
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  valueText: {
    color: colors.textMain,
    marginVertical: spacing.xs,
  },
  capitalize: {
    textTransform: "capitalize",
    color: colors.textMuted,
    fontWeight: "600",
  },
  instructionsText: {
    color: colors.textMuted,
    lineHeight: 24,
    fontSize: 15,
  },
});
