// src/shared/profile/useProfile.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const PROFILE_KEY = '@workout_app_profile';

export type UserProfile = {
  gender: string;
  age: string;
  height: string;
  weight: string;
  goal: string;
  photoUri?: string;
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

  // --- DEVICE FEATURE ABSTRACTION ---
  const updateProfilePicture = async () => {
    // 1. Request native device permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert(
        'Permission to access camera roll is required to upload progress photos!',
      );
      return;
    }

    // 2. Launch native device feature
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // <-- Modern array syntax
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    // 3. Handle result and save locally
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImageUri = result.assets[0].uri;

      if (profile) {
        await saveProfile({ ...profile, photoUri: newImageUri });
      }
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

  return {
    profile,
    saveProfile,
    clearProfile,
    updateProfilePicture,
    isLoading,
  };
}
