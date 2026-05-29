// app/(tabs)/settings.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  Switch,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Header,
  Typography,
  Card,
  colors,
  spacing,
  shapes,
  useSettings,
} from '#shared';

export default function SettingsScreen() {
  const { settings, updateSetting, isLoading } = useSettings();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size='large'
          color={colors.brand}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Header title='Preferences' />

      <View style={styles.content}>
        <Card style={styles.card}>
          {/* Input 1: Switch */}
          <View style={styles.settingRow}>
            <Typography
              variant='body'
              style={styles.label}
            >
              Use Metric System (kg/cm)
            </Typography>
            <Switch
              value={settings.useMetric}
              onValueChange={(value) => updateSetting('useMetric', value)}
              trackColor={{ false: colors.surfaceMuted, true: colors.brand }}
            />
          </View>

          <View style={styles.divider} />

          {/* Input 2: Switch */}
          <View style={styles.settingRow}>
            <Typography
              variant='body'
              style={styles.label}
            >
              Auto-Start Rest Timers
            </Typography>
            <Switch
              value={settings.autoStartRestTimers}
              onValueChange={(value) =>
                updateSetting('autoStartRestTimers', value)
              }
              trackColor={{ false: colors.surfaceMuted, true: colors.brand }}
            />
          </View>

          <View style={styles.divider} />

          {/* Input 3: TextInput */}
          <View style={styles.settingRow}>
            <Typography
              variant='body'
              style={styles.label}
            >
              Default Rest Time (seconds)
            </Typography>
            <TextInput
              style={styles.textInput}
              value={settings.defaultRestTime}
              onChangeText={(text) => updateSetting('defaultRestTime', text)}
              keyboardType='numeric'
              maxLength={3}
              returnKeyType='done'
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  card: {
    padding: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  label: {
    flex: 1,
    color: colors.textMain,
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: shapes.radiusSmall,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    fontSize: 16,
    color: colors.textMain,
    backgroundColor: colors.surface,
    minWidth: 70,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
});
