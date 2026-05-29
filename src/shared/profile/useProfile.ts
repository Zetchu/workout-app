import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const PROFILE_KEY = '@workout_app_profile';

export type UserProfile = {
  gender: string;
  age: string;
  height: string; // in cm
  weight: string; // in kg
  goal: string;
};

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem(PROFILE_KEY);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error('Failed to load user profile', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfile = async (newProfile: UserProfile) => {
    try {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
      setProfile(newProfile);
    } catch (error) {
      console.error('Failed to save user profile', error);
    }
  };

  const clearProfile = async () => {
    try {
      await AsyncStorage.removeItem(PROFILE_KEY);
      setProfile(null);
    } catch (error) {
      console.error('Failed to clear profile', error);
    }
  };

  return { profile, saveProfile, clearProfile, isLoading };
}
