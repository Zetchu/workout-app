import { render, screen } from "@testing-library/react-native";
import Badge from "./Badge";

describe("Design > Elements > Badge", () => {
  it("renders the label correctly", () => {
    render(<Badge label="Hypertrophy" backgroundColor="#38bdf8" />);
    // Check that the text actually appeared!
    expect(screen.getByText("Hypertrophy")).toBeTruthy();
  });
});
