// src/shared/components/RestTimer/RestTimer.tsx
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Modal, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Notifications from "expo-notifications";

import Typography from "../../design/elements/Typography";
import { colors } from "../../design/foundations/colors";
import { spacing } from "../../design/foundations/spacing";
import { shapes } from "../../design/foundations/shapes";
import {
  triggerLightImpact,
  triggerSuccessFeedback,
} from "../../device/haptics";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RestTimer() {
  const [modalVisible, setModalVisible] = useState(false);
  const [duration, setDuration] = useState(60); // Default 1 min
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    void triggerLightImpact();
    setTimeLeft(duration);
    setIsTimerActive(true);
    setModalVisible(false);
  };

  const cancelTimer = () => {
    void triggerLightImpact();
    setIsTimerActive(false);
    setTimeLeft(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleTimerCompletion = () => {
    setIsTimerActive(false);
    void triggerSuccessFeedback();

    void Notifications.scheduleNotificationAsync({
      content: {
        title: "⚡ Rest Complete!",
        body: "Time to secure your next set. Push through limits!",
      },
      trigger: null,
    });

    Alert.alert(
      "⚡ Rest Complete!",
      "Time to secure your next set. Push through limits!",
      [{ text: "LET'S GO", onPress: () => void triggerLightImpact() }],
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const modifyDuration = (amount: number) => {
    void triggerLightImpact();
    setDuration((prev) => {
      const next = prev + amount;
      if (next < 60) return 60;
      if (next > 300) return 300;
      return next;
    });
  };

  useEffect(() => {
    void (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    })();
  }, []);

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleTimerCompletion();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTimerActive, timeLeft]);

  return (
    <View>
      {isTimerActive ? (
        <TouchableOpacity
          style={styles.activeTimerBadge}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="time" size={14} color={colors.background} />
          <Typography style={styles.timerText}>
            {formatTime(timeLeft)}
          </Typography>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            void triggerLightImpact();
            setModalVisible(true);
          }}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Ionicons name="timer-outline" size={24} color={colors.textMain} />
        </TouchableOpacity>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Typography variant="title" style={styles.modalTitle}>
              {isTimerActive
                ? "Active Rest Interval"
                : "Configure Rest Interval"}
            </Typography>

            {isTimerActive ? (
              <View style={styles.countdownContainer}>
                <Typography style={styles.bigTimerDisplay}>
                  {formatTime(timeLeft)}
                </Typography>
                <Typography style={styles.subLabel}>
                  REMAINING HYDRO GAP
                </Typography>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={cancelTimer}
                >
                  <Typography style={styles.cancelBtnText}>
                    ABORT INTERVAL
                  </Typography>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.setupContainer}>
                <View style={styles.selectorRow}>
                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => modifyDuration(-30)}
                    disabled={duration <= 60}
                  >
                    <Ionicons
                      name="remove"
                      size={24}
                      color={duration <= 60 ? colors.border : colors.textMain}
                    />
                  </TouchableOpacity>

                  <View style={styles.timeLabelWrapper}>
                    <Typography style={styles.durationValueDisplay}>
                      {formatTime(duration)}
                    </Typography>
                    <Typography style={styles.subLabel}>
                      ({duration / 60} MIN)
                    </Typography>
                  </View>

                  <TouchableOpacity
                    style={styles.adjustBtn}
                    onPress={() => modifyDuration(30)}
                    disabled={duration >= 300}
                  >
                    <Ionicons
                      name="add"
                      size={24}
                      color={duration >= 300 ? colors.border : colors.textMain}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.startButton}
                  onPress={startTimer}
                >
                  <Typography style={styles.startBtnText}>
                    START REST INTERVAL
                  </Typography>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.closeTextButton}
              onPress={() => {
                void triggerLightImpact();
                setModalVisible(false);
              }}
            >
              <Typography style={styles.closeText}>DISMISS WINDOW</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  activeTimerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.brand,
    paddingHorizontal: 12,

    paddingVertical: 6,
    borderRadius: shapes.radiusPill,
  },
  timerText: { color: colors.background, fontWeight: "900", fontSize: 13 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  modalContent: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: shapes.radiusLarge,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: "center",
  },
  modalTitle: {
    fontWeight: "800",
    fontSize: 18,
    color: colors.textMain,
    marginBottom: spacing.lg,
  },
  setupContainer: { width: "100%", alignItems: "center" },
  countdownContainer: { width: "100%", alignItems: "center", gap: spacing.sm },
  bigTimerDisplay: {
    fontSize: 56,
    fontWeight: "900",
    color: colors.brand,
    letterSpacing: 2,
    lineHeight: 64,
    textAlign: "center",
    marginVertical: spacing.sm,
  },
  selectorRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xl,
    marginVertical: spacing.md,
  },
  adjustBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  timeLabelWrapper: { alignItems: "center", minWidth: 100 },
  durationValueDisplay: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.textMain,
  },
  subLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 1,
  },
  startButton: {
    backgroundColor: colors.brand,
    width: "100%",
    padding: spacing.md,
    borderRadius: shapes.radiusMedium,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  startBtnText: {
    color: colors.background,
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  cancelButton: {
    backgroundColor: "rgba(255, 76, 76, 0.1)",
    borderWidth: 1,
    borderColor: "#FF4C4C",
    width: "100%",
    padding: spacing.md,
    borderRadius: shapes.radiusMedium,
    alignItems: "center",
    marginTop: spacing.md,
  },
  cancelBtnText: {
    color: "#FF4C4C",
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  closeTextButton: { marginTop: spacing.lg, padding: spacing.xs },
  closeText: {
    color: colors.textMuted,
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
