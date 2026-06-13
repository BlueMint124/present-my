import { describe, expect, it } from "vitest";
import { characterState, diaryPrompts, insightMetrics, publicProfileItems } from "./demoData";

describe("demo data", () => {
  it("contains the five diary prompts from the product design", () => {
    expect(diaryPrompts.map((prompt) => prompt.id)).toEqual(["mood", "scene", "me", "liked", "free"]);
  });

  it("has weekly character update information", () => {
    expect(characterState.level).toContain("Week");
    expect(characterState.unlockedItems.length).toBeGreaterThanOrEqual(3);
  });

  it("contains private insights and public profile items", () => {
    expect(insightMetrics.length).toBeGreaterThanOrEqual(4);
    expect(publicProfileItems.some((item) => item.id === "private")).toBe(true);
  });
});
