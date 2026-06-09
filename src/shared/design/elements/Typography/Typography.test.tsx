import React from "react";
import { render, screen, userEvent } from "@testing-library/react-native";
import Typography from "./Typography";

describe("Design > Elements > Typography", () => {
  it("renders text correctly", () => {
    render(<Typography>Hello World</Typography>);

    // Assert the text is on the screen
    expect(screen.getByText("Hello World")).toBeTruthy();
  });

  it("handles press actions", async () => {
    const mockOnPress = jest.fn();
    render(<Typography onPress={mockOnPress}>Click Me</Typography>);

    const textElement = screen.getByText("Click Me");

    // Simulate a user pressing the text
    const user = userEvent.setup();
    await user.press(textElement);

    // Verify the mock function fired once
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
