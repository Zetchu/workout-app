import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export const useShakeSensor = (onShake: () => void, sensitivity = 2.2) => {
  useEffect(() => {
    // Set sensor update interval (in milliseconds)
    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener((data) => {
      // Calculate total G-Force acceleration vector
      const acceleration = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);

      if (acceleration > sensitivity) {
        onShake();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [onShake, sensitivity]);
};
