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
import { Typography, Card } from '../src/shared'; // Adjust imports as needed
import { useProfile } from '../src/shared/profile/useProfile';

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
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType='numeric'
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              keyboardType='numeric'
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType='numeric'
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Primary Goal</Text>
            <TextInput
              style={styles.input}
              value={goal}
              onChangeText={setGoal}
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
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { textAlign: 'center', marginBottom: 8 },
  subtitle: { textAlign: 'center', color: '#64748b', marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, color: '#334155', marginBottom: 6, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
