import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Card,
  Typography,
  colors,
  spacing,
  shapes,
  useFavorites,
} from "#shared";
import { Exercise } from "../../services/workoutService";

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(exercise.name);

  return (
    <Card style={styles.cardSpacing}>
      <View style={styles.headerRow}>
        <View style={styles.textBlock}>
          <Typography variant="title" style={styles.nameText}>
            {exercise.name}
          </Typography>
          <Typography variant="body" style={styles.descText} numberOfLines={2}>
            {exercise.instructions ||
              "High-performance routine for physiological adaptations."}
          </Typography>
        </View>

        {/* INTERACTIVE HEART CELL CAPABILITY */}
        <TouchableOpacity
          onPress={() => void toggleFavorite(exercise)}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Ionicons
            name={favorited ? "heart" : "heart-outline"}
            size={22}
            color={favorited ? colors.brand : colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.chipRow}>
          <View style={styles.chip}>
            <Ionicons name="barbell-outline" size={12} color={colors.brand} />
            <Typography variant="label" style={styles.chipText}>
              {exercise.muscle}
            </Typography>
          </View>
          <View style={styles.chip}>
            <Ionicons
              name="shield-checkmark-outline"
              size={12}
              color={colors.brand}
            />
            <Typography variant="label" style={styles.chipText}>
              {exercise.difficulty}
            </Typography>
          </View>
        </View>

        <View style={styles.startButton}>
          <Typography variant="label" style={styles.btnText}>
            START
          </Typography>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardSpacing: { marginBottom: spacing.md, padding: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textBlock: { flex: 1, paddingRight: spacing.sm },
  nameText: { fontSize: 18, fontWeight: "800", marginBottom: 4 },
  descText: { color: colors.textMuted, fontSize: 13, lineHeight: 18 },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.md,
  },
  chipRow: { flexDirection: "row", gap: spacing.base },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.base,
    paddingVertical: 6,
    borderRadius: shapes.radiusPill,
  },
  chipText: {
    color: colors.textMuted,
    textTransform: "capitalize",
    fontSize: 11,
  },
  startButton: {
    backgroundColor: colors.brand,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: shapes.radiusSmall,
  },
  btnText: { color: colors.background, fontWeight: "900" },
});
