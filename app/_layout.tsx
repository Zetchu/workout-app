import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='onboarding' />

        <Stack.Screen name='(tabs)' />

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
