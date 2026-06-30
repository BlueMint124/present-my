import { describe, expect, it } from "vitest";
import { shopItems } from "../data/shopItems";
import { DEFAULT_PLAYER_PROGRESS, equipShopItem } from "./playerProgress";

describe("playerProgress equipment slots", () => {
  it("equips non-overlapping shop items at the same time", () => {
    const cloudCushion = shopItems.find((item) => item.id === "cloud-cushion");
    const warmLamp = shopItems.find((item) => item.id === "warm-lamp");

    expect(cloudCushion).toBeDefined();
    expect(warmLamp).toBeDefined();

    let progress = {
      ...DEFAULT_PLAYER_PROGRESS,
      ownedShopItemIds: ["cloud-cushion", "warm-lamp"]
    };

    progress = equipShopItem(progress, cloudCushion!);
    progress = equipShopItem(progress, warmLamp!);

    expect(progress.equippedShopItemIds).toMatchObject({
      "background-floor-front": "cloud-cushion",
      "background-light": "warm-lamp"
    });
  });

  it("replaces only the item in the same equipment slot", () => {
    const sproutBeret = shopItems.find((item) => item.id === "sprout-beret");
    const diaryBadge = shopItems.find((item) => item.id === "diary-badge");
    const cloudCushion = shopItems.find((item) => item.id === "cloud-cushion");

    expect(sproutBeret).toBeDefined();
    expect(diaryBadge).toBeDefined();
    expect(cloudCushion).toBeDefined();

    let progress = {
      ...DEFAULT_PLAYER_PROGRESS,
      ownedShopItemIds: ["sprout-beret", "diary-badge", "cloud-cushion"]
    };

    progress = equipShopItem(progress, sproutBeret!);
    progress = equipShopItem(progress, cloudCushion!);
    progress = equipShopItem(progress, diaryBadge!);

    expect(progress.equippedShopItemIds).toMatchObject({
      "background-floor-front": "cloud-cushion",
      head: "diary-badge"
    });
    expect(progress.equippedShopItemIds.head).not.toBe("sprout-beret");
  });
});
