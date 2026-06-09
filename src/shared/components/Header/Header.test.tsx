import React from "react";
import { render, screen } from "@testing-library/react-native";
import Header from "./Header";

// Mock the RestTimer to prevent its complex hooks (like notifications) from running
jest.mock("../RestTimer", () => {
  const { View } = require("react-native");
  return function MockRestTimer() {
    return <View testID="mock-rest-timer" />;
  };
});

describe("Shared > Components > Header", () => {
  // Smoke test
  it("works", () => {
    render(<Header />);
  });

  // Integration/Unit test verifying DOM output
  it("renders the brand text correctly", () => {
    render(<Header />);

    // Verifies the internal brand text works
    expect(screen.getByText("FORGE FITNESS")).toBeTruthy();
  });
});
