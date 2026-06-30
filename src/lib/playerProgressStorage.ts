import { findShopItem } from "../data/shopItems";
import { DEFAULT_PLAYER_PROGRESS, type PlayerProgress } from "./playerProgress";

export const PLAYER_PROGRESS_STORAGE_KEY = "moodbe.playerProgress";

export function loadPlayerProgress(storage: Storage = window.localStorage): PlayerProgress {
  const rawProgress = storage.getItem(PLAYER_PROGRESS_STORAGE_KEY);

  if (!rawProgress) {
    return DEFAULT_PLAYER_PROGRESS;
  }

  try {
    const parsedProgress = JSON.parse(rawProgress);
    return isPlayerProgress(parsedProgress) ? parsedProgress : migratePlayerProgress(parsedProgress);
  } catch {
    return DEFAULT_PLAYER_PROGRESS;
  }
}

export function persistPlayerProgress(
  progress: PlayerProgress,
  storage: Storage = window.localStorage
) {
  storage.setItem(PLAYER_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

function isPlayerProgress(progress: unknown): progress is PlayerProgress {
  if (!progress || typeof progress !== "object") {
    return false;
  }

  const candidate = progress as Partial<PlayerProgress>;
  return (
    typeof candidate.coinBalance === "number" &&
    Boolean(candidate.equippedShopItemIds) &&
    typeof candidate.equippedShopItemIds === "object" &&
    typeof candidate.experience === "number" &&
    typeof candidate.level === "number" &&
    Array.isArray(candidate.ownedShopItemIds) &&
    typeof candidate.totalDiaryEntries === "number"
  );
}

function migratePlayerProgress(progress: unknown): PlayerProgress {
  if (!progress || typeof progress !== "object") {
    return DEFAULT_PLAYER_PROGRESS;
  }

  const candidate = progress as Partial<PlayerProgress> & { equippedShopItemId?: string | null };

  if (
    typeof candidate.coinBalance !== "number" ||
    typeof candidate.experience !== "number" ||
    typeof candidate.level !== "number" ||
    !Array.isArray(candidate.ownedShopItemIds) ||
    typeof candidate.totalDiaryEntries !== "number"
  ) {
    return DEFAULT_PLAYER_PROGRESS;
  }

  const equippedShopItemIds: PlayerProgress["equippedShopItemIds"] = {};
  const legacyItem = findShopItem(candidate.equippedShopItemId);

  if (legacyItem) {
    equippedShopItemIds[legacyItem.equipSlot] = legacyItem.id;
  }

  return {
    coinBalance: candidate.coinBalance,
    equippedShopItemIds,
    experience: candidate.experience,
    level: candidate.level,
    ownedShopItemIds: candidate.ownedShopItemIds,
    totalDiaryEntries: candidate.totalDiaryEntries
  };
}
