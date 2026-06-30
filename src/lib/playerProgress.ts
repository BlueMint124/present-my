import type { ShopItem } from "../data/shopItems";
import type { DiaryEntry } from "../types";

export type PlayerProgress = {
  coinBalance: number;
  equippedShopItemId: string | null;
  experience: number;
  level: number;
  ownedShopItemIds: string[];
  totalDiaryEntries: number;
};

export type PurchaseResult = "success" | "owned" | "insufficient-funds" | "level-locked";

export const DEFAULT_PLAYER_PROGRESS: PlayerProgress = {
  coinBalance: 320,
  equippedShopItemId: null,
  experience: 0,
  level: 1,
  ownedShopItemIds: [],
  totalDiaryEntries: 0
};

export function getRequiredExperienceForLevel(level: number) {
  return 100 + (level - 1) * 50;
}

export function applyExperience(progress: PlayerProgress, experienceGain: number): PlayerProgress {
  let nextLevel = progress.level;
  let nextExperience = progress.experience + experienceGain;
  let requiredExperience = getRequiredExperienceForLevel(nextLevel);

  while (nextExperience >= requiredExperience) {
    nextExperience -= requiredExperience;
    nextLevel += 1;
    requiredExperience = getRequiredExperienceForLevel(nextLevel);
  }

  return {
    ...progress,
    experience: nextExperience,
    level: nextLevel
  };
}

export function grantDiaryExperience(progress: PlayerProgress, entry: DiaryEntry): PlayerProgress {
  const experienceGain = entry.tags.includes("diary-session") ? 120 : 20;

  return {
    ...applyExperience(progress, experienceGain),
    totalDiaryEntries: progress.totalDiaryEntries + 1
  };
}

export function purchaseShopItem(
  progress: PlayerProgress,
  item: ShopItem
): { progress: PlayerProgress; result: PurchaseResult } {
  if (progress.ownedShopItemIds.includes(item.id)) {
    return { progress, result: "owned" };
  }

  if ((item.requiredLevel ?? 1) > progress.level) {
    return { progress, result: "level-locked" };
  }

  if (progress.coinBalance < item.price) {
    return { progress, result: "insufficient-funds" };
  }

  return {
    progress: {
      ...progress,
      coinBalance: progress.coinBalance - item.price,
      ownedShopItemIds: [...progress.ownedShopItemIds, item.id]
    },
    result: "success"
  };
}

export function equipShopItem(progress: PlayerProgress, itemId: string): PlayerProgress {
  if (!progress.ownedShopItemIds.includes(itemId)) {
    return progress;
  }

  return {
    ...progress,
    equippedShopItemId: itemId
  };
}
