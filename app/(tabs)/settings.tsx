import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>User Settings & Profile Configuration</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  text: { color: '#64748b', fontSize: 16, fontWeight: '500' },
});
