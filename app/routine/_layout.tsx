import { Stack } from 'expo-router';

export default function RoutineStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: '#ffffff',
        headerStyle: { backgroundColor: '#0284c7' },
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name='[id]'
        options={{ title: 'Exercise Breakdown' }}
      />
    </Stack>
  );
}
