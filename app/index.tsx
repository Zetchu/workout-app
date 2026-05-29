import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useProfile } from '#shared';
export default function Index() {
  const { profile, isLoading } = useProfile();

  // Show a blank loading screen while checking storage
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0f172a',
        }}
      >
        <ActivityIndicator
          size='large'
          color='#ffffff'
        />
      </View>
    );
  }

  // If they have a profile, send them to the main app. If not, force onboarding!
  if (profile) {
    return <Redirect href='/(tabs)' />;
  } else {
    return <Redirect href='/onboarding' />;
  }
}
