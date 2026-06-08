import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Header,
  Typography,
  Card,
  colors,
  spacing,
  shapes,
  triggerLightImpact,
} from '#shared';
import { useProfile } from '#profile';

export default function OnboardingScreen() {
  const router = useRouter();
  const { saveProfile } = useProfile();

  // --- LOCAL COMPONENT FORM STATES ---
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('Lean Bulking');

  const handleCompleteOnboarding = async () => {
    // Basic form verification validation
    if (!name.trim() || !age.trim() || !height.trim() || !weight.trim()) {
      Alert.alert(
        'Metrics Incomplete',
        'Please fill in all athletic targets to initialize your training dashboard.',
      );
      return;
    }

    void triggerLightImpact();

    // Preserve full structural variables cleanly to disk
    await saveProfile({
      name: name.trim(),
      gender,
      age,
      height,
      weight,
      goal,
    });

    // Bounce directly to the main tab interface
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps='handled'
      >
        <Typography
          variant='display'
          style={styles.title}
        >
          Initialize Setup
        </Typography>
        <Typography style={styles.subtitle}>
          Configure your biometric tracking matrix.
        </Typography>

        <Card style={styles.formCard}>
          {/* 👑 NEW NAME INPUT FIELD */}
          <Typography
            variant='label'
            style={styles.inputLabel}
          >
            ATHLETE HANDLE / NAME
          </Typography>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder='Enter your name...'
              placeholderTextColor={colors.textDim}
              value={name}
              onChangeText={setName}
              autoCapitalize='words'
              autoCorrect={false}
            />
          </View>

          <Typography
            variant='label'
            style={[styles.inputLabel, { marginTop: spacing.md }]}
          >
            AGE (YEARS)
          </Typography>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder='e.g. 26'
              placeholderTextColor={colors.textDim}
              value={age}
              onChangeText={setAge}
              keyboardType='number-pad'
            />
          </View>

          <View style={styles.rowInputs}>
            <View style={{ flex: 1 }}>
              <Typography
                variant='label'
                style={styles.inputLabel}
              >
                HEIGHT (CM)
              </Typography>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder='180'
                  placeholderTextColor={colors.textDim}
                  value={height}
                  onChangeText={setHeight}
                  keyboardType='number-pad'
                />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Typography
                variant='label'
                style={styles.inputLabel}
              >
                WEIGHT (KG)
              </Typography>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder='80'
                  placeholderTextColor={colors.textDim}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType='number-pad'
                />
              </View>
            </View>
          </View>

          <Typography
            variant='label'
            style={[styles.inputLabel, { marginTop: spacing.md }]}
          >
            PRIMARY OBJECTIVE
          </Typography>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder='e.g. Lean Bulking'
              placeholderTextColor={colors.textDim}
              value={goal}
              onChangeText={setGoal}
            />
          </View>
        </Card>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleCompleteOnboarding}
        >
          <Typography style={styles.submitBtnText}>BUILD TRACKER</Typography>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: {
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xl,
  },
  title: { fontWeight: '900', color: colors.textMain, marginTop: spacing.sm },
  subtitle: { color: colors.textMuted, fontSize: 14, marginBottom: spacing.lg },
  formCard: { padding: 20, gap: spacing.xs },
  inputLabel: {
    color: colors.brand,
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  inputWrapper: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: shapes.radiusSmall,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 48,
    justifyContent: 'center',
  },
  textInput: {
    color: colors.textMain,
    fontSize: 14,
    width: '100%',
    height: '100%',
  },
  rowInputs: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  submitButton: {
    backgroundColor: colors.brand,
    padding: spacing.md,
    borderRadius: shapes.radiusMedium,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  submitBtnText: {
    color: colors.background,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
