import * as Haptics from 'expo-haptics';

export const triggerLightImpact = async () => {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (error) {
    console.log('Haptics not supported on this environment');
  }
};

export const triggerSuccessFeedback = async () => {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (error) {
    console.log('Haptics not supported on this environment');
  }
};
