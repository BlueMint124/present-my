import { describe, expect, it } from "vitest";
import { publicProfileItems } from "../data/demoData";
import { containsPrivateDiaryItem, getApprovedProfileItems } from "./profile";

describe("profile privacy helpers", () => {
  it("filters public profile to approved items only", () => {
    const approved = getApprovedProfileItems(publicProfileItems);

    expect(approved.every((item) => item.approved)).toBe(true);
    expect(approved.map((item) => item.id)).not.toContain("private");
  });

  it("detects accidental diary-original approval", () => {
    expect(containsPrivateDiaryItem(publicProfileItems)).toBe(false);
  });
});
