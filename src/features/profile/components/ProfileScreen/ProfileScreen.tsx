import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  Header,
  Typography,
  Card,
  colors,
  spacing,
  shapes,
  triggerLightImpact,
} from "#shared";
import { useProfile } from "../../useProfile";

export default function ProfileScreen() {
  const { profile, updateProfilePicture } = useProfile();

  const stats = [
    { id: "1", val: "12", label: "DAY STREAK", icon: "flame-outline" as const },
    {
      id: "2",
      val: "154",
      label: "WORKOUTS",
      icon: "barbell-outline" as const,
    },
    {
      id: "3",
      val: "42k",
      label: "KCAL BURNED",
      icon: "pulse-outline" as const,
    },
  ];

  const handlePickImage = async () => {
    void triggerLightImpact();

    await updateProfilePicture();
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Glow-framed Interactive Avatar */}
        <View style={styles.avatarBlock}>
          <TouchableOpacity
            onPress={handlePickImage}
            activeOpacity={0.8}
            style={styles.avatarTouch}
          >
            <View style={styles.glowRing}>
              <Image
                source={{
                  uri:
                    profile?.photoUri ||
                    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200",
                }}
                style={styles.avatarImage}
              />
              <View style={styles.editBadge}>
                <Ionicons name="camera" size={14} color={colors.background} />
              </View>
            </View>
          </TouchableOpacity>

          <Typography variant="title" style={styles.name}>
            {profile?.name || "David"}
          </Typography>

          <View style={styles.badgeRow}>
            <View style={styles.darkBadge}>
              <Typography variant="label" style={styles.badgeText}>
                Athletic Build
              </Typography>
            </View>
            <View style={styles.limeBadge}>
              <Typography variant="label" style={styles.limeBadgeText}>
                Active Stack
              </Typography>
            </View>
          </View>
        </View>

        {/* Dynamic Metric Dashboard Grid */}
        <View style={styles.statsGrid}>
          {stats.map((s) => (
            <Card key={s.id} style={styles.statCard}>
              <Ionicons name={s.icon} size={18} color={colors.brand} />
              <Typography variant="display" style={styles.statVal}>
                {s.val}
              </Typography>
              <Typography variant="label" style={styles.statLabel}>
                {s.label}
              </Typography>
            </Card>
          ))}
        </View>

        {/* Personal Onboarding Storage Data Section */}
        <Typography variant="title" style={styles.secTitle}>
          Personal Data
        </Typography>
        <Card style={styles.dataCard}>
          <View style={styles.dataRow}>
            <Ionicons name="body-outline" size={16} color={colors.brand} />
            <Typography style={styles.dataText}>
              Gender:{" "}
              <Typography style={styles.boldVal}>
                {profile?.gender || "Male"}
              </Typography>
            </Typography>
          </View>

          <View style={styles.divider} />

          <View style={styles.dataRow}>
            <Ionicons name="calendar-outline" size={16} color={colors.brand} />
            <Typography style={styles.dataText}>
              Age:{" "}
              <Typography style={styles.boldVal}>
                {profile?.age || "26"}
              </Typography>
            </Typography>
          </View>

          <View style={styles.divider} />

          <View style={styles.dataRow}>
            <Ionicons name="resize-outline" size={16} color={colors.brand} />
            <Typography style={styles.dataText}>
              Height:{" "}
              <Typography style={styles.boldVal}>
                {profile?.height || "180"} cm
              </Typography>
            </Typography>
          </View>

          <View style={styles.divider} />

          <View style={styles.dataRow}>
            <Ionicons name="fitness-outline" size={16} color={colors.brand} />
            <Typography style={styles.dataText}>
              Current Weight:{" "}
              <Typography style={styles.boldVal}>
                {profile?.weight || "78"} kg
              </Typography>
            </Typography>
          </View>

          <View style={styles.divider} />

          <View style={styles.dataRow}>
            <Ionicons
              name="trending-up-outline"
              size={16}
              color={colors.brand}
            />
            <Typography style={styles.dataText}>
              Fitness Goal:{" "}
              <Typography style={styles.boldVal}>
                {profile?.goal || "Lean Bulking"}
              </Typography>
            </Typography>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: {
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xl,
  },
  avatarBlock: { alignItems: "center", marginTop: spacing.md },
  avatarTouch: { padding: 4 },
  glowRing: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 3,
    borderColor: colors.brand,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarImage: { width: 92, height: 92, borderRadius: 46 },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.brand,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.background,
  },
  name: { fontWeight: "900", marginTop: spacing.sm, fontSize: 20 },
  badgeRow: {
    flexDirection: "row",
    gap: spacing.base,
    marginTop: spacing.base,
  },
  darkBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: shapes.radiusPill,
  },
  badgeText: { color: colors.textMuted, fontSize: 11 },
  limeBadge: {
    backgroundColor: "rgba(204, 255, 0, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: shapes.radiusPill,
  },
  limeBadgeText: { color: colors.brand, fontSize: 11, fontWeight: "700" },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  statCard: {
    flex: 1,
    minWidth: "30%",
    padding: spacing.md,
    alignItems: "center",
  },
  statVal: { fontWeight: "900", color: colors.textMain, marginVertical: 2 },
  statLabel: { color: colors.textMuted, fontSize: 10, fontWeight: "700" },
  secTitle: {
    fontWeight: "800",
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  dataCard: { padding: spacing.md },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.base,
    paddingVertical: 4,
  },
  dataText: { fontSize: 14, color: colors.textMain },
  boldVal: { fontWeight: "700", color: colors.textMuted },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
});
