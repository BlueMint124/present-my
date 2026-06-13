import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App navigation", () => {
  it("shows the visual reference board by default", () => {
    render(<App />);

    expect(screen.getAllByRole("heading", { name: /Present My/ }).length).toBeGreaterThan(0);
    expect(screen.getByText("Moodby")).toBeInTheDocument();
    expect(screen.getByText("Character Turnaround")).toBeInTheDocument();
    expect(screen.getByText("Shop / Ads / Payment / Achievements")).toBeInTheDocument();
  });

  it("keeps the presentation board free of app chrome", () => {
    render(<App />);

    expect(screen.queryByRole("navigation", { name: "주요 화면" })).not.toBeInTheDocument();
    expect(screen.getByLabelText("Present My visual design board")).toBeInTheDocument();
  });
});
