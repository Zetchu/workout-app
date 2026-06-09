// src/shared/settings/useSettings.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const SETTINGS_KEY = "@workout_app_user_settings";

export type UserSettings = {
  useMetric: boolean;
  autoStartRestTimers: boolean;
  defaultRestTime: string; // Stored as string from TextInput
};

const defaultSettings: UserSettings = {
  useMetric: true,
  autoStartRestTimers: false,
  defaultRestTime: "90", // Default 90 seconds
};

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  const loadSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to load settings", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSettings();
  }, []);

  const updateSetting = async <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K],
  ) => {
    try {
      // Update state immediately for a snappy UI
      const updatedSettings = { ...settings, [key]: value };
      setSettings(updatedSettings);

      // Persist to device storage in the background
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to save setting: ${key}`, error);
    }
  };

  return { settings, updateSetting, isLoading };
}
