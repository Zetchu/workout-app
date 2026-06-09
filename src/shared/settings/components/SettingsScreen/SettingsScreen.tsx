import React from "react";
import {
  View,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

import { useSettings } from "../../useSettings";

import Header from "../../../components/Header/index";
import Typography from "../../../design/elements/Typography/index";
import Card from "../../../design/elements/Card/index";
import { colors } from "../../../design/foundations/colors";
import { spacing } from "../../../design/foundations/spacing";
import { shapes } from "../../../design/foundations/shapes";
import {
  triggerLightImpact,
  triggerSuccessFeedback,
} from "../../../device/haptics/index";
import { useProfile } from "#profile";

export default function SettingsScreen() {
  const router = useRouter();
  const { settings, updateSetting } = useSettings();
  const { clearProfile } = useProfile();
  const menuOptions = [
    {
      label: "Account",
      sub: "Security, email, and password",
      icon: "person-outline" as const,
    },
    {
      label: "Notifications",
      sub: "Workout reminders & push alerts",
      icon: "notifications-outline" as const,
    },
    {
      label: "Privacy",
      sub: "Data sharing and profile visibility",
      icon: "shield-checkmark-outline" as const,
    },
  ];

  const handleLogout = async () => {
    // 1. Fire a clean haptic pulse sequence
    void triggerSuccessFeedback();

    // 2. Clear out the AsyncStorage keys
    await clearProfile();

    router.replace("/onboarding");
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Typography variant="title" style={styles.title}>
          Settings
        </Typography>

        {/* Metric Hardware Selection Toggles */}
        <Card style={styles.configCard}>
          <View style={styles.toggleRow}>
            <Typography style={styles.settingLabel}>
              Use Metric System (kg/cm)
            </Typography>
            <Switch
              value={settings.useMetric}
              onValueChange={(val) => {
                void triggerLightImpact();
                updateSetting("useMetric", val);
              }}
              trackColor={{ false: colors.surfaceBright, true: colors.brand }}
              thumbColor={colors.textMain}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.toggleRow}>
            <Typography style={styles.settingLabel}>
              Auto-Start Rest Timers
            </Typography>
            <Switch
              value={settings.autoStartRestTimers}
              onValueChange={(val) => {
                void triggerLightImpact();
                updateSetting("autoStartRestTimers", val);
              }}
              trackColor={{ false: colors.surfaceBright, true: colors.brand }}
              thumbColor={colors.textMain}
            />
          </View>
        </Card>

        {/* Option Navigation Tiles */}
        <Card style={styles.menuCard}>
          {menuOptions.map((opt, i) => {
            return (
              <View key={opt.label}>
                <TouchableOpacity
                  style={styles.tileRow}
                  onPress={() => void triggerLightImpact()}
                >
                  <View style={styles.tileLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name={opt.icon}
                        size={18}
                        color={colors.textMain}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Typography style={styles.tileTitle}>
                        {opt.label}
                      </Typography>
                      <Typography style={styles.tileSub}>{opt.sub}</Typography>
                    </View>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={18}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
                {i < menuOptions.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
        </Card>

        {/* Logout Trigger Card */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout} // Hook up our clean clearance state action
        >
          <Ionicons name="log-out-outline" size={18} color={colors.error} />
          <Typography style={styles.logoutText}>LOG OUT</Typography>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xl,
  },
  title: { fontWeight: "900", marginBottom: spacing.md, marginTop: spacing.sm },
  configCard: { padding: spacing.md, marginBottom: spacing.md },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  settingLabel: { fontWeight: "600", fontSize: 14 },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  menuCard: { padding: 0, overflow: "hidden" },
  tileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
  },
  tileLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  iconContainer: {
    backgroundColor: colors.surfaceMuted,
    padding: 10,
    borderRadius: shapes.radiusSmall,
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
  },
  textContainer: {
    flex: 1,
  },
  tileTitle: { fontWeight: "700", fontSize: 15 },
  tileSub: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.base,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: shapes.radiusLarge,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  logoutText: { color: colors.error, fontWeight: "800", letterSpacing: 0.5 },
});
