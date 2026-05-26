import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function ExerciseDetailScreen() {
  const { id, muscle, difficulty, equipment, instructions } =
    useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>{decodeURIComponent(id as string)}</Text>

      <View style={styles.badgeContainer}>
        <Text style={styles.badge}>Muscle: {muscle}</Text>
        <Text style={styles.badge}>Difficulty: {difficulty}</Text>
        <Text style={styles.badge}>Equipment: {equipment}</Text>
      </View>

      <Text style={styles.subheading}>Instructions</Text>
      <Text style={styles.instructionsText}>
        {instructions || 'No walkthrough listed.'}
      </Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Return to Catalog</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  badge: {
    backgroundColor: '#e2e8f0',
    color: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  instructionsText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 24,
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#0284c7',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
});
