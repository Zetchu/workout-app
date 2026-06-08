import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Typography, Card, colors, spacing, shapes } from '#shared';
import { useProfile } from '../../useProfile';

export default function OnboardingScreen() {
  const router = useRouter();
  const { saveProfile } = useProfile();

  // Initialize with some sensible baseline defaults
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('26');
  const [height, setHeight] = useState('183');
  const [weight, setWeight] = useState('77');
  const [goal, setGoal] = useState('Bodybuilding / Muscle Growth');

  const handleSave = async () => {
    await saveProfile({ gender, age, height, weight, goal });
    // Navigate to the main tabs once saved
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Typography
          variant='title'
          style={styles.title}
        >
          Welcome!
        </Typography>
        <Typography
          variant='body'
          style={styles.subtitle}
        >
          Let's set up your profile to personalize your routines.
        </Typography>

        <Card>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType='numeric'
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              keyboardType='numeric'
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType='numeric'
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Primary Goal</Text>
            <TextInput
              style={styles.input}
              value={goal}
              onChangeText={setGoal}
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </Card>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Complete Setup</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.lg, justifyContent: 'center' },
  title: { textAlign: 'center', marginBottom: spacing.xs },
  subtitle: {
    textAlign: 'center',
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  inputGroup: { marginBottom: spacing.md },
  label: {
    fontSize: 14,
    color: colors.textMain,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: shapes.radiusSmall,
    padding: spacing.md,
    fontSize: 16,
    backgroundColor: colors.surface,
    color: colors.textMain,
  },
  button: {
    backgroundColor: colors.brand,
    padding: spacing.md,
    borderRadius: shapes.radiusMedium,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  buttonText: { color: colors.surface, fontSize: 16, fontWeight: 'bold' },
});
