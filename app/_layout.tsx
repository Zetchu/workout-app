import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {/* The main interface points to our tabs layout group */}
        <Stack.Screen name='(tabs)' />
        {/* The routine sub-stack handles nested stack requirements */}
        <Stack.Screen
          name='routine'
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style='light' />
    </>
  );
}
