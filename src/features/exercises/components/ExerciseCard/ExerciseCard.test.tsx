import React from "react";
import { render, screen } from "@testing-library/react-native";
import ExerciseCard from "./ExerciseCard";
import { Exercise } from "../../services/workoutService";

// 1. Mock AsyncStorage to bypass the native module requirement
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

// 2. Mock useFavorites to bypass the Provider requirement
jest.mock("../../../../shared/favorites/FavoritesContext", () => ({
  useFavorites: () => ({
    favorites: [],
    toggleFavorite: jest.fn(),
    isFavorite: jest.fn(() => false), // Mocks that the exercise is not favorited
  }),
}));

// 3. Mock vector icons to fix the act() async state update warnings
jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");

// 4. Mock expo-notifications to prevent warnings caused by shared index exports
jest.mock("expo-notifications", () => ({
  getPermissionsAsync: jest.fn(() => Promise.resolve({ status: "granted" })),
  requestPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" }),
  ),
  setNotificationHandler: jest.fn(), // <--- Add this line!
}));

// Mock data that mirrors an API Ninjas exercise payload
const mockExercise: Exercise = {
  name: "Incline Dumbbell Press",
  type: "strength",
  muscle: "chest",
  equipment: "dumbbells",
  difficulty: "intermediate",
  instructions:
    "Lie back on an incline bench. Lift dumbbells above chest and press upward smoothly.",
};

describe("ExerciseCard Component", () => {
  it("renders the exercise details correctly", () => {
    render(<ExerciseCard exercise={mockExercise} />);

    // Assert that the exercise title is visible
    expect(screen.getByText("Incline Dumbbell Press")).toBeTruthy();

    // Assert that the instructions render text accurately
    expect(
      screen.getByText(
        "Lie back on an incline bench. Lift dumbbells above chest and press upward smoothly.",
      ),
    ).toBeTruthy();

    // Assert that the difficulty level is displayed inside the badge
    expect(screen.getByText("intermediate")).toBeTruthy();

    // Assert that the metadata tags render correctly
    expect(screen.getByText("chest")).toBeTruthy();
    expect(screen.getByText("intermediate")).toBeTruthy();

    // Assert that the instructions render text accurately
    expect(
      screen.getByText(
        "Lie back on an incline bench. Lift dumbbells above chest and press upward smoothly.",
      ),
    ).toBeTruthy();
  });

  it("renders a placeholder if equipment is missing or not provided", () => {
    const { equipment, ...exerciseWithoutEquipment } = mockExercise;

    const incompleteExercise = {
      ...exerciseWithoutEquipment,
      instructions: "Just lift it.",
    } as Exercise;

    render(<ExerciseCard exercise={incompleteExercise} />);
    expect(screen.getByText("Just lift it.")).toBeTruthy();
  });
});
